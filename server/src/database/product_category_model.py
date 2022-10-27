from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column
from sqlalchemy.types import Text, String
from src.database.config import Base


class ProductCategoryModel(Base):
    __tablename__ = "productcategory"
    categoryId = Column(String, primary_key=True, index=True)
    categoryName = Column(Text)
    product = relationship("ProductModel", back_populates="category")

