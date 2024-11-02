from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Dict, List
import json


app = FastAPI()

 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],  
)

 
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Pydantic models
class CartItem(BaseModel):
    unicID: int
    name: str
    price: float
    quantity: int
    photo: int


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    user_login = Column(String, unique=True, index=True)
    user_password = Column(String)
    user_carts = Column(String, default=json.dumps({}))


# JWT Setup
SECRET_KEY = "secret"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

Base.metadata.create_all(bind=engine)

 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Utility functions for authentication
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


def authenticate_user(db, username: str, password: str):
    user = db.query(User).filter(User.user_login == username).first()
    if user and verify_password(password, user.user_password):
        return user
    return False


# Authentication route
@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: SessionLocal = Depends(get_db)):
    user = db.query(User).filter(User.user_login == form_data.username).first()

    # If user does not exist, create a new user
    if not user:
        hashed_password = get_password_hash(form_data.password)
        new_user = User(user_login=form_data.username, user_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user  # Set the user to the newly created user

    # Verify the password if the user exists
    if not verify_password(form_data.password, user.user_password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # Generate and return the access token
    token_data = {"sub": user.user_login}
    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer"}


# Get current user
def get_current_user(token: str = Depends(oauth2_scheme), db: SessionLocal = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.user_login == username).first()
    if user is None:
        raise credentials_exception

    return user


@app.post("/addCart")
def add_cart(cart_items: List[CartItem], db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    # Load or initialize carts
    carts = json.loads(user.user_carts) if user.user_carts else {}

    # Generate new cart ID
    new_cart_id = str(len(carts) + 1)

    # Add new cart items
    carts[new_cart_id] = [item.dict() for item in cart_items]

    # Update user carts and commit to DB
    user.user_carts = json.dumps(carts)
    db.commit()

    # Return new cart ID
    return {"cart_id": new_cart_id}


# Get cart by ID
@app.get("/getCart")
def get_cart(cart_id: str = Query(...), db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')  # Ensure carts is a valid JSON string

    # Check if the cart exists
    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")

    # Return the specific cart
    return carts[cart_id]


# Update cart by ID
@app.put("/updateCart")
def update_cart(cart_items: List[CartItem], cart_id: str = Query(...), db: SessionLocal = Depends(get_db),
                user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')  # Ensure carts is a valid JSON string

    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")

    # Update the cart with the new items
    carts[cart_id] = [item.dict() for item in cart_items]
    user.user_carts = json.dumps(carts)
    db.commit()

    return {"cart_id": cart_id}



@app.delete("/deleteCart")
def delete_cart(cart_id: str = Query(...), db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')  # Ensure carts is a valid JSON string

    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")

    # Delete the specified cart
    del carts[cart_id]

    # Update the user's carts in the database
    user.user_carts = json.dumps(carts)
    db.commit()

    return {"detail": "Cart deleted"}

# Get all carts for the current user
@app.get("/carts")
def get_all_carts(db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    # Load the user's carts
    carts = json.loads(user.user_carts or '{}')  # Ensure carts is a valid JSON string
    
    # Return all carts
    return carts
