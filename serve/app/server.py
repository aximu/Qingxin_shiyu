from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from langserve import add_routes
from app.chain import chain
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated
from langserve import APIHandler
from langserve.pydantic_v1 import BaseModel
from typing import Any, List, Optional, Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from uuid import UUID
import asyncio

import langsmith
from langsmith import Client
import os
import json
from fastapi.responses import JSONResponse
from chain import chain_with_history

os.environ["LANGCHAIN_API_KEY"] = ""
os.environ["LANGCHAIN_API_ENDPOINT"] = "https://api.smith.langchain.com"  #LangSmith的服务端点
os.environ["LANGCHAIN_TRACING_V2"]="true"
os.environ["LANGCHAIN_PROJECT"]="" #自定义项目名称

client = Client()

app = FastAPI(
    title="Health Diet Server",
    version="1.0",
    description="Spin up a simple api server using Langchain's Runnable interfaces",
)

# Set CORS Policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

add_routes(
    app,
    chain_with_history,
    path="/chat",
    enable_feedback_endpoint=True,
)

##feedback
class SendFeedbackBody(BaseModel):
    run_id: UUID
    key: str = "user_score"

    score: Union[float, int, bool, None] = None
    feedback_id: Optional[UUID] = None
    comment: Optional[str] = None

@app.post("/feedback")
async def send_feedback(body: SendFeedbackBody):
    client.create_feedback(
        body.run_id,
        body.key,
        score=body.score,
        comment=body.comment,
        feedback_id=body.feedback_id,
    )
    return {"result": "posted feedback successfully", "code": 200}

class UpdateFeedbackBody(BaseModel):
    feedback_id: UUID
    score: Union[float, int, bool, None] = None
    comment: Optional[str] = None
    
@app.patch("/feedback")
async def update_feedback(body: UpdateFeedbackBody):
    feedback_id = body.feedback_id
    if feedback_id is None:
        return {
            "result": "No feedback ID provided",
            "code": 400,
        }
    client.update_feedback(
        feedback_id,
        score=body.score,
        comment=body.comment,
    )
    return {"result": "patched feedback successfully", "code": 200}

async def _arun(func, *args, **kwargs):
    return await asyncio.get_running_loop().run_in_executor(None, func, *args, **kwargs)


async def aget_trace_url(run_id: str) -> str:
    for i in range(5):
        try:
            await _arun(client.read_run, run_id)
            break
        except langsmith.utils.LangSmithError:
            await asyncio.sleep(1**i)

    if await _arun(client.run_is_shared, run_id):
        return await _arun(client.read_run_shared_link, run_id)
    return await _arun(client.share_run, run_id)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
