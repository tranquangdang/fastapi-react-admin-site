from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, DateTime, Float,Text
from src.database.config import Base


class ProductModel(Base):
    __tablename__ = "product"
    productId = Column(Integer, primary_key=True, index=True)
    categoryNo = Column(String, ForeignKey("productcategory.categoryId"))
    brand = Column(Text)
    productName = Column(Text)
    productImg = Column(String)
    intro = Column(Text)
    unitPrice = Column(Integer)
    perDiscount = Column(Float)
    qtyOnHand = Column(Integer)
    timeCreate = Column(DateTime)
    category = relationship("ProductCategoryModel", back_populates="product")




