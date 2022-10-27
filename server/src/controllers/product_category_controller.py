
from sqlalchemy.orm import Session

from src.database.product_category_model import ProductCategoryModel
import src.database.product_model as model
from src.database.config import engine

model.Base.metadata.create_all(bind=engine)


def read_product_category(db: Session):
    return db.query(ProductCategoryModel).all()