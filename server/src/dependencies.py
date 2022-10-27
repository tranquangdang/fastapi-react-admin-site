import os
from typing import Union

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .database.admin_model import AdminModel
from .database.config import SessionLocal
from .schemas.admin_schema import AdminSchema

SECRET_KEY = os.getenv("SECRET_KEY", "1234")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

security = HTTPBearer()


def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class TokenData(BaseModel):
    account: Union[str, None] = None


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),
                           db: Session = Depends(get_database_session)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        account: str = payload.get("sub")

        if account is None:
            raise HTTPException(
                status_code=401,
                detail='Account not found')
        token_data = TokenData(account=account)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail='Authorization token expired')
    except Exception:
        raise HTTPException(
            status_code=401,
            detail='Unable to parse authentication token')
    user = db.query(AdminModel).filter(AdminModel.account == token_data.account).first()
    if user is None:
        raise HTTPException(
            status_code=401,
            detail='Account invalid')
    return user


async def get_current_active_user(current_user: AdminSchema = Depends(get_current_user)):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
