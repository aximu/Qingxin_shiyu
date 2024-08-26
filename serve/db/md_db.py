import chromadb
#from langchain_chroma import Chroma
from langchain.vectorstores.chroma import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain.document_loaders.pdf import PyMuPDFLoader
from langchain_community.document_loaders import UnstructuredMarkdownLoader

file_paths = []
data_folder_path = './source_data/recipe_ingredient_info'
for root, dirs, files in os.walk(data_folder_path):
    for file in files:
        file_path = os.path.join(root, file)
        file_paths.append(file_path)
        
loaders = []
for file_path in file_paths:
    file_type = file_path.split('.')[-1]
    if file_type == 'txt':
        loaders.append(UnstructuredMarkdownLoader(file_path))
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
texts = []
for loader in loaders:
    texts.extend(loader.load())

# 切分文档
# text_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=500, chunk_overlap=50)

# split_docs = text_splitter.split_documents(texts)
embedding=OllamaEmbeddings(model="bge-m3:latest")
# 定义持久化路径
persist_directory = './chroma'

vectordb = Chroma.from_documents(
    documents=texts, 
    embedding=embedding,
    persist_directory=persist_directory,
    # collection_name = 'food_recipes'
)

vectordb.persist()
print(f"向量库中存储的数量：{vectordb._collection.count()}")

'''检索测试'''
question="推荐每天吃的全谷物食物是多少？"
sim_docs = vectordb.similarity_search(question,k=3)
print(f"检索到的内容数：{len(sim_docs)}")

for i, sim_doc in enumerate(sim_docs):
    print(f"检索到的第{i}个内容: \n{sim_doc.page_content[:200]}", end="\n--------------\n")
