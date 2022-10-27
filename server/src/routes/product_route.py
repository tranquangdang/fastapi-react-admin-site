from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.controllers import product_controller
from src.dependencies import get_database_session, get_current_active_user
from src.schemas.product_schema import ProductSchema

router = APIRouter(
    prefix="/products",
    tags=["products"],
    dependencies=[Depends(get_database_session), Depends(get_current_active_user)],
    responses={404: {"description": "Not found"}},
)


@router.get("")
async def read_products(db: Session = Depends(get_database_session)):
    return product_controller.read_products(db)


@router.post("")
async def insert(data: ProductSchema, db: Session = Depends(get_database_session)):
    return product_controller.insert(data, db)

@router.delete("/{id}")
async def delete(id: int, db: Session = Depends(get_database_session)):
    return product_controller.delete(id, db)

@router.patch("")
async def update(data: ProductSchema, db: Session = Depends(get_database_session)):
    return product_controller.update(data, db)


@router.get("/{id}")
async def read_product_by_id(id: int, db: Session = Depends(get_database_session)):
    return product_controller.read_product_by_id(db, id)
