from sqlalchemy.orm import Session

from src.database.product_category_model import ProductCategoryModel
from src.database.product_model import ProductModel
import src.database.product_model as model
from src.database.config import engine

model.Base.metadata.create_all(bind=engine)


def read_products(db: Session):
    return db.query(ProductModel, ProductCategoryModel).join(ProductCategoryModel).all()


def read_product_by_id(db: Session, id: int):
    return db.query(ProductModel, ProductCategoryModel).join(ProductCategoryModel).filter(
        ProductModel.productId == id).first()


def insert(data: ProductModel, db: Session):
    db.add(ProductModel(
        categoryNo=data.categoryNo,
        productName=data.productName,
        brand=data.brand,
        intro=data.intro,
        unitPrice=data.unitPrice,
        perDiscount=data.perDiscount,
        qtyOnHand=data.qtyOnHand,
    ))
    db.commit()


def delete(id: int, db: Session):
    product: ProductModel = db.query(ProductModel).get(id)
    db.delete(product)
    db.commit()


def update(data: ProductModel, db: Session):
    product: ProductModel = db.query(ProductModel).get(data.productId)
    product.categoryNo = data.categoryNo,
    product.productName = data.productName,
    product.brand = data.brand,
    product.intro = data.intro,
    product.unitPrice = data.unitPrice,
    product.perDiscount = data.perDiscount,
    product.qtyOnHand = data.qtyOnHand,
    db.commit()
