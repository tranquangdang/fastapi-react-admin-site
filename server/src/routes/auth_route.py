from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.dependencies import get_current_active_user


router = APIRouter(
    prefix="/token",
    tags=["token"],
    dependencies=[Depends(get_current_active_user)],
    responses={404: {"description": "Not found"}}
)


@router.get("")
async def checkToken(current_user: Session = Depends(get_current_active_user)):
    return current_user

