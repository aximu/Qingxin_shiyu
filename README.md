# Qingxin_shiyu
Ai chatbot for healthy diet.
推理基座为 浪潮信息源大模型Yuan2-2B-Mars-hf

# 先决条件
- Python 和 Node.js：确保系统已安装 Python（带有 poetry）和 Node.js。
- Git：如果尚未安装，请安装 Git 以克隆仓库。
## 安装并运行 FastAPI LangChain 服务
1. 克隆仓库：克隆该仓库。
2. 切换到目录：将当前目录更改为 Langchain 服务文件夹。
```cd server```
3. 安装依赖项：使用 poetry 安装 Python 依赖项。
```poetry install```
4. 启动 FastAPI 服务：运行 FastAPI LangChain 服务。
```poetry run langchain serve```
完成！
# 安装并运行 Next.js 应用程序
1. 切换到目录：将当前目录更改为 "front" 文件夹中的 Next.js 应用程序仓库。
2. 安装依赖项：安装 Node.js 依赖项。
```npm install```或者 ```yarn install```
3. 配置环境变量：设置应用程序所需的环境变量。在 Next.js 应用的根目录下创建一个 .env 文件，并添加以下内容：
```NEXT_PUBLIC_API=http://localhost:8000```
如果 FastAPI LangChain 服务托管在其他地方，请将 http://localhost:8000 替换为您的服务 URL。
4. 启动 Next.js 应用程序：运行 Next.js 应用。
```npm run dev```或者 ```yarn dev```
此命令将启动 Next.js 开发服务器，该服务器将可在 http://localhost:3000 访问。
# 访问应用程序
一旦 FastAPI 服务和 Next.js 应用程序都在运行，您可以通过在网页浏览器中访问 http://localhost:3000 来访问应用程序。应用程序应能与 FastAPI LangChain 服务通信，以执行语言处理任务。
# 结论
现在您已成功安装并运行了 FastAPI LangChain 服务和 Next.js 应用程序。
