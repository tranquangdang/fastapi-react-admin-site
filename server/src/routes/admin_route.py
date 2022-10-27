from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.dependencies import get_database_session
from src.schemas.admin_schema import AdminSchema
import src.controllers.admin_controller as admin_controller

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_database_session)],
    responses={404: {"description": "Not found"}}
)


@router.post("/login")
async def login(data: AdminSchema, db: Session = Depends(get_database_session)):
    return admin_controller.login(data, db)


@router.post("/signup")
async def login(data: AdminSchema, db: Session = Depends(get_database_session)):
    return admin_controller.signup(data, db)
