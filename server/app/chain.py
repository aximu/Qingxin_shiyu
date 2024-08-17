from dotenv import load_dotenv
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
# from langchain_openai.chat_models import ChatOpenAI
# from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama

load_dotenv()

vectorstore = DocArrayInMemorySearch.from_texts(
    [
        "在 E-smile，我们不仅仅是顾问，我们是你实现健康生活的盟友，通过人工智能的力量帮助你改善饮食习惯。我们相信，真正的改变不仅仅在于技术的使用，而在于健康饮食理念能够全面融入你的生活方式。我们致力于创建一个健康生态系统，让智能饮食推荐不仅成为日常生活的一部分，而且能够无缝融入你的饮食决策。我们将引导你走完这个饮食优化的旅程，确保这个过程不仅顺畅，而且能够真正赋能。与 E-smile 同行，你正迈向一个充满健康与活力的未来。",
"E-smile 成立于 2016 年 8 月，致力于通过人工智能帮助个人和家庭实现健康饮食目标。我们的智能系统通过个性化的饮食推荐，推动健康生活方式的普及，提高人们的饮食质量，并通过数据驱动的建议改变人们的饮食习惯。",
        """E-smile 健康工作室
欢迎来到 E-smile 健康工作室，在这里我们将你的健康愿景转化为现实。我们致力于通过智能饮食推荐系统帮助你和你的家庭实现健康饮食。我们的系统不仅仅是一个工具，而是你实现健康生活的伙伴，通过科学的饮食建议改善你的生活质量。

E-smile 方法论
在 E-smile 健康中心，我们通过智能技术和营养学知识的结合，帮助你从饮食中获得最大的健康收益。我们将数据驱动的饮食建议与个性化营养计划相结合，解决健康挑战，帮助你探索更加健康的生活方式。我们与用户紧密合作，通过个性化推荐和持续的支持，确保每个人都能实现他们的健康目标。

E-smile 开发工作室
在 E-smile 开发工作室中，我们不仅开发智能饮食推荐系统，还致力于推动健康技术的前沿发展。我们的专家团队为你提供创新的数字解决方案，通过智能推荐系统帮助你做出更健康的饮食选择。无论是营养跟踪、膳食规划还是个性化推荐，我们都专注于为你提供全面的健康支持，让你在健康之路上领先一步。

发展智能饮食：健康推荐与个性化服务
在 E-smile 开发工作室，我们不仅提供智能饮食推荐系统，还为你在健康管理领域提供战略合作。我们的承诺是通过先进的健康技术帮助你优化饮食，改善生活质量。相信我们，我们将通过智能饮食建议帮助你实现健康目标，达成令人满意的成果。让我们一起构建一个更加健康的未来，为你和你的家人带来持久的健康与幸福。"""
     ],
    #embedding=OpenAIEmbeddings(),
    embedding=OllamaEmbeddings(model="nomic-embed-text")
)
retriever = vectorstore.as_retriever()

template = """只根据以下内容作答:
{context}

问题: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
#model = ChatOpenAI()
model = Ollama(model="glm4")
output_parser = StrOutputParser()

setup_and_retrieval = RunnableParallel(
    {"context": retriever, "question": RunnablePassthrough()}
)
chain = setup_and_retrieval | prompt | model | output_parser

