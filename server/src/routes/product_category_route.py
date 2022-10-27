from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.controllers import product_category_controller
from src.dependencies import get_database_session, get_current_active_user

router = APIRouter(
    prefix="/product-category",
    tags=["product-category"],
    dependencies=[Depends(get_database_session), Depends(get_current_active_user)],
    responses={404: {"description": "Not found"}},
)


@router.get("")
async def read_products(db: Session = Depends(get_database_session)):
    return product_category_controller.read_product_category(db)


@router.get("/detail/{id}")
async def read_product_by_id(id: int, db: Session = Depends(get_database_session)):
    return product_controller.read_product_by_id(db,id)