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

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


class UserInDB(User):
    hashed_password: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Remove docs url in order to not expose information to the public
app = FastAPI(
    docs_url=None,
    redoc_url=None
)

# For this proyect we are going to use some fake user to protect paid services of being use publicly
fake_users_db = {
    "aximof": {
        "username": "aximof",
        "full_name": "full name",
        "email": "me@mail.com",
        "hashed_password": "password_1",
        "disabled": False,
    },
    "Allen": {
        "username": "Allen",
        "full_name": "User Name",
        "email": "me@mail.com",
        "hashed_password": "password_2",
        "disabled": False,
    },
    "Eric": {
        "username": "Eric",
        "full_name": "User Name",
        "email": "me@mail.com",
        "hashed_password": "password_3",
        "disabled": False,
    }
}

# Set CORS Policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not password == user.hashed_password:
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# We are using "/token" path to send user credentials
@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

# Return 403 in this route to forbid this path
@app.get("/")
async def redirect_root_to_docs():
    raise HTTPException(status_code=403, detail="Forbidden")

api_handler = APIHandler(
    chain,
    path="/chat-here",
)

# This path is to start chatting and it's restricted to users only
@app.post("/chat-here/invoke")
async def invoke_with_auth(
        invoke_request: api_handler.InvokeRequest,
        request: Request,
        current_user: Annotated[User, Depends(get_current_user)],
    ) -> Response:
        """Handle a request."""
        config = {"configurable": {"user_id": current_user.username}}
        return await api_handler.invoke(request, server_config=config)

# This is to verify the token from the client side
@app.get("/verify-auth")
async def verify_auth(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        return {"authenticated": True, "username": username}
    except JWTError:
        return {"authenticated": False}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
