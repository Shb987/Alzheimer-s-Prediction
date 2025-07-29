from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from database import Base, engine, get_db
from models import User
from auth import (
    get_password_hash,
    authenticate_user,
    create_access_token,
    verify_token
)

app = FastAPI()

# Create DB
Base.metadata.create_all(bind=engine)

# CORS: allow frontend (React) to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class RegisterModel(BaseModel):
    username: str
    password: str

class LoginModel(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(user: RegisterModel, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    
    new_user = User(
        username=user.username,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    return {"msg": "User registered"}

@app.post("/login")
def login(user: LoginModel, response: Response, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db, user.username, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    response.set_cookie(key="token", value=token, httponly=True)
    return {"msg": "Login successful"}

@app.get("/home")
def home(token: str = Depends(verify_token)):
    return {"msg": f"Welcome {token['sub']}!"}

@app.post("/logout")
def logout(response: Response):
    response.delete_cookie("token")
    return {"msg": "Logged out"}
