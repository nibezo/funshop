from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Dict, List
import json
import uuid 

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

# New class for goods
class Good(Base):
    __tablename__ = "goods"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    quantity = Column(Integer)  # Available quantity

class CartItem(BaseModel):
    orderNumber: str  # Change unicID to orderNumber
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

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: SessionLocal = Depends(get_db)):
    user = db.query(User).filter(User.user_login == form_data.username).first()
    if not user:
        hashed_password = get_password_hash(form_data.password)
        new_user = User(user_login=form_data.username, user_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user
    if not verify_password(form_data.password, user.user_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    token_data = {"sub": user.user_login}
    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer"}

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
    carts = json.loads(user.user_carts) if user.user_carts else {}
    new_cart_id = str(uuid.uuid4())  # Generate a unique UUID for the cart ID
    new_cart_items = []

    for item in cart_items:
        good = db.query(Good).filter(Good.name == item.name).first()
        if not good:
            raise HTTPException(status_code=404, detail=f"Good '{item.name}' not found")
        if good.quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough '{item.name}' in stock")

        # Deduct the quantity from the available stock
        good.quantity -= item.quantity
        db.commit()

        new_cart_items.append({
            "orderNumber": f"{uuid.uuid4().int:010}",  # Generate a formatted order number
            "name": item.name,
            "price": item.price,
            "quantity": item.quantity,
            "photo": item.photo
        })

    carts[new_cart_id] = new_cart_items
    user.user_carts = json.dumps(carts)
    db.commit()
    return {"cart_id": new_cart_id}

@app.get("/getCart")
def get_cart(cart_id: str = Query(...), db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')  
    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")
    return carts[cart_id]

@app.put("/updateCart")
def update_cart(cart_items: List[CartItem], cart_id: str = Query(...), db: SessionLocal = Depends(get_db),
                user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}') 
    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")
    carts[cart_id] = [item.dict() for item in cart_items]
    user.user_carts = json.dumps(carts)
    db.commit()

    return {"cart_id": cart_id}

@app.delete("/deleteCart")
def delete_cart(cart_id: str = Query(...), db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')   
    if cart_id not in carts:
        raise HTTPException(status_code=404, detail="No cart found")
    del carts[cart_id]
    user.user_carts = json.dumps(carts)
    db.commit()

    return {"detail": "Cart deleted"}

@app.get("/carts")
def get_all_carts(db: SessionLocal = Depends(get_db), user: User = Depends(get_current_user)):
    carts = json.loads(user.user_carts or '{}')
    return carts

@app.get("/goods")
def get_available_goods(db: SessionLocal = Depends(get_db)):
    goods = db.query(Good).all()
    available_goods = {good.name: good.quantity for good in goods if good.quantity > 0}
    return available_goods

# Seed initial goods data (this should only run once or be managed elsewhere)
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    goods_data = [
        {"name": "2GIS Ferret", "quantity": 54612},
        {"name": "Bender", "quantity": 46154},
        {"name": "Indignant cat", "quantity": 42},
        {"name": "Sad hamster 🧐", "quantity": 31},
        {"name": "Happy cat", "quantity": 675},
        {"name": "Ferret", "quantity": 2434},
        {"name": "Misha", "quantity": 5},
        {"name": "Calling monkey", "quantity": 10},
        {"name": "Smiling monkey", "quantity": 652},
        {"name": "Angry ferret", "quantity": 34},
        {"name": "slyCat", "quantity": 344},
        {"name": "TV", "quantity": 4353},
    ]

    for good in goods_data:
        if not db.query(Good).filter(Good.name == good["name"]).first():
            new_good = Good(name=good["name"], quantity=good["quantity"])
            db.add(new_good)
    db.commit()
    db.close()
