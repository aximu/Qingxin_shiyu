
import re
from pathlib import Path
from typing import Callable, Union

from fastapi import FastAPI, HTTPException
#from langchain_anthropic import ChatAnthropic
from langchain_community.chat_message_histories import FileChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables import RunnableMap, RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.retrievers import BaseRetriever
from langchain_community.embeddings import OllamaEmbeddings
from operator import itemgetter
from langchain.vectorstores.chroma import Chroma
from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
    format_document,
)
from langserve import add_routes
from langserve.pydantic_v1 import BaseModel, Field
from langchain_community.llms import Ollama
from llm import Yuan2_LLM
from langchain.retrievers import ContextualCompressionRetriever
from reranker.reranker import LangchainReranker

### ANSWER_TEMPLATE
ANSWER_TEMPLATE = """
    您是一名专业的健康饮食推荐专家顾问，负责解答有关健康饮食的任何问题。\
请根据以下要求生成一个全面且信息丰富的回答，仅基于提供的搜索结果（网址和内容）。\
您必须只使用提供的搜索结果中的信息。采用客观公正的专业人士风格，将搜索结果融合成一个连贯的回答。\
不要重复文本。使用[${{数字}}]标记引用搜索结果。只引用最能准确回答问题的相关结果，并将引用放置在引用内容的句子或段落末尾，而不是全部放在最后。\
如果不同结果涉及同名不同实体，请为每个实体分别撰写答案。\

请使用项目符号以提高回答的可读性，并将引用放置在适当位置，而不是全部放在最后。\

如果上下文中没有与问题相关的信息，只需说“嗯，我不确定。”不要尝试编造答案。\

以下context 块之间的内容是从知识库中检索的，不是与用户的对话部分。根据context的内容回答用户的问题：
<context>
    {context} 
<context/>

用户问题: {question}
"""
ANSWER_PROMPT = ChatPromptTemplate.from_template(ANSWER_TEMPLATE)

## CONDENSE_QUESTION_PROMPT
REPHRASE_TEMPLATE = """\
给定以下对话历史和一个后续问题，请将后续问题结合历史记录重新表述为一个独立的问题，目的是让后续问题更加清晰。

对话历史:
{history}
后续问题: {question}
独立问题:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(REPHRASE_TEMPLATE)

DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")

def _is_valid_identifier(value: str) -> bool:
    """Check if the session ID is in a valid format."""
    # Use a regular expression to match the allowed characters
    valid_characters = re.compile(r"^[a-zA-Z0-9-_]+$")
    return bool(valid_characters.match(value))

def create_session_factory(
    base_dir: Union[str, Path],
) -> Callable[[str], BaseChatMessageHistory]:
    """Create a session ID factory that creates session IDs from a base dir.

    Args:
        base_dir: Base directory to use for storing the chat histories.

    Returns:
        A session ID factory that creates session IDs from a base path.
    """
    base_dir_ = Path(base_dir) if isinstance(base_dir, str) else base_dir
    if not base_dir_.exists():
        base_dir_.mkdir(parents=True)

    def get_chat_history(session_id: str) -> FileChatMessageHistory:
        """Get a chat history from a session ID."""
        session_id = 'aximof'
        if not _is_valid_identifier(session_id):
            raise HTTPException(
                status_code=400,
                detail=f"Session ID `{session_id}` is not in a valid format. "
                "Session ID must only contain alphanumeric characters, "
                "hyphens, and underscores.",
            )
        file_path = base_dir_ / f"{session_id}.json"
        return FileChatMessageHistory(str(file_path))

    return get_chat_history

## llm model, local deployed model
llm = Yuan2_LLM('/home/cad/test/nextjs/nextjs-fastapi-langchain-master/server/app/IEITYuan/Yuan2-2B-Mars-hf')

_inputs = RunnableMap(
    standalone_question= CONDENSE_QUESTION_PROMPT
    | llm
    | StrOutputParser(),
)

## rerank model
reranker_model_path  = '/home/cad/test/nextjs/nextjs-fastapi-langchain-master/backend_serve/app/reranker/bge-reranker-v2-m3'
reranker = LangchainReranker(model_name_or_path=reranker_model_path, top_n=3)

##retriever
CHROMA_DB_PATH = '/home/cad/test/nextjs/nextjs-fastapi-langchain-master/backend_serve/db/chroma'   
def get_retriever() -> BaseRetriever:
    embedding=OllamaEmbeddings(model="bge-m3:latest")
    chroma_db = Chroma(persist_directory=CHROMA_DB_PATH, embedding_function=embedding)

    return chroma_db.as_retriever(search_kwargs=dict(k=10))

retriever = get_retriever()

compression_retriever = ContextualCompressionRetriever(
    base_compressor=reranker, base_retriever=retriever
)


def _combine_documents(
    docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"
):
    """Combine documents into a single string."""
    doc_strings = [format_document(doc, document_prompt) for doc in docs]
    return document_separator.join(doc_strings)

_context = {
    "context": itemgetter("standalone_question") | compression_retriever | _combine_documents,
    "question": lambda x: x["standalone_question"],
}

conversational_qa_chain = (
    _inputs | _context | ANSWER_PROMPT | llm | StrOutputParser()
)

class InputChat(BaseModel):
    """Input for the chat endpoint."""

    # The field extra defines a chat widget.
    # As of 2024-02-05, this chat widget is not fully supported.
    # It's included in documentation to show how it should be specified, but
    # will not work until the widget is fully supported for history persistence
    # on the backend.
    question: str = Field(
        ...,
        description="The human input to the chat system.",
        extra={"widget": {"type": "chat", "input": "question"}},
    )


chain_with_history = RunnableWithMessageHistory(
    conversational_qa_chain,
    create_session_factory("chat_histories"),
    input_messages_key="question",
    history_messages_key="history",
).with_types(input_type=InputChat)
