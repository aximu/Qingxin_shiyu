import chromadb
#from langchain_chroma import Chroma
from langchain.vectorstores.chroma import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.document_loaders.pdf import PyMuPDFLoader

file_paths = []
data_folder_path = './source_data'
for root, dirs, files in os.walk(data_folder_path):
    for file in files:
        file_path = os.path.join(root, file)
        file_paths.append(file_path)
        
loaders = []
for file_path in file_paths:
    file_type = file_path.split('.')[-1]
    if file_type == 'pdf':
        loaders.append(PyMuPDFLoader(file_path))
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
texts = []
for loader in loaders:
    texts.extend(loader.load())
    
# text = texts[1]
# print(f"每一个元素的类型：{type(text)}.", 
#     f"该文档的描述性数据：{text.metadata}", 
#     f"查看该文档的内容:\n{text.page_content[0:]}", 
#     sep="\n------\n")

# 切分文档
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, chunk_overlap=50)

split_docs = text_splitter.split_documents(texts)
embedding=OllamaEmbeddings(model="bge-m3:latest")
# 定义持久化路径
persist_directory = './chroma'

vectordb = Chroma.from_documents(
    documents=split_docs, 
    embedding=embedding,
    persist_directory=persist_directory  
)

vectordb.persist()
print(f"向量库中存储的数量：{vectordb._collection.count()}")

'''检索测试'''
question="推荐每天吃的全谷物食物是多少？"
sim_docs = vectordb.similarity_search(question,k=3)
print(f"检索到的内容数：{len(sim_docs)}")

for i, sim_doc in enumerate(sim_docs):
    print(f"检索到的第{i}个内容: \n{sim_doc.page_content[:200]}", end="\n--------------\n")

# def ingest_docs():
#     COLLECTION_NAME="Healthy_diet"
    
#     persistent_client = chromadb.PersistentClient()
#     collection = persistent_client.get_or_create_collection(COLLECTION_NAME)
#     collection.add(ids=["1", "2", "3"], documents=["a", "b", "c"])
    
    
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
    
#     vector_store_from_client = Chroma(
#     client=persistent_client,
#     collection_name=COLLECTION_NAME,
#     embedding_function=embedding,
#     )
    
    

# if __name__ == "__main__":
#     ingest_docs()