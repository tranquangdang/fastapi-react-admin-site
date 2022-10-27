from typing import Union

from pydantic import BaseModel


class AdminSchema(BaseModel):
    id: Union[int, None] = None
    account: str
    password: Union[str, None] = None
    name: Union[str, None] = None
    role: Union[str, None] = None

    class Config:
        orm_mode = True