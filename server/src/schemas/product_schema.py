from typing import Union

from pydantic import BaseModel


class ProductSchema(BaseModel):
    productId: Union[int, None] = None
    categoryNo: str
    brand: str
    productName: str
    productImg: Union[str, None] = None
    intro: str
    unitPrice: int
    perDiscount: float
    qtyOnHand: int
    timeCreate: Union[str, None] = None

    class Config:
        orm_mode = True