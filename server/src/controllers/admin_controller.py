import os
from datetime import timedelta, datetime
from typing import Union

from fastapi import HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import JSONResponse

from src.database.admin_model import AdminModel
import src.database.admin_model as model
from src.database.config import engine
from passlib.context import CryptContext

model.Base.metadata.create_all(bind=engine)

SECRET_KEY = os.getenv("SECRET_KEY", "1234")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def login(data: AdminModel, db: Session):
    result = db.query(AdminModel).filter(AdminModel.account == data.account).first()
    if result is not None:
        verify_password = pwd_context.verify(data.password, result.password)

        if not verify_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Password incorrect"
            )
        else:
            access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
            access_token = create_access_token(
                data={"sub": result.account}, expires_delta=access_token_expires
            )
            data = {"name": result.name, "account": result.account}
            response = JSONResponse(data)
            response.set_cookie(key="access_token", value=access_token)
            return response
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )


def signup(data: AdminModel, db: Session):
    result = db.query(AdminModel).filter(AdminModel.account == data.account).first()
    if result is None:
        db.add(AdminModel(
            account=data.account,
            password=pwd_context.hash(data.password),
            name=data.name,
            role=1
        ))
        db.commit()
        return JSONResponse(status_code=200, content={
            "status_code": 200,
            "message": "signup success"
        })
    else:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Account exist"
        )
