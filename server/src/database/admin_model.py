from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer
from src.database.config import Base


class AdminModel(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True, index=True)
    account = Column(String)
    password = Column(String)
    name = Column(String)
    role = Column(String)

