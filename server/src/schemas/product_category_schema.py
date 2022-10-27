from typing import Union

from pydantic import BaseModel


class ProductSchema(BaseModel):
    productId = str
    categoryNo = str

    class Config:
        orm_mode = True