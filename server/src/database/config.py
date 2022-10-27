from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os

host = os.getenv("POSTGRES_HOST", "localhost")
db = os.getenv("POSTGRES_DB", "salesmanagement")
username = os.getenv("POSTGRES_USERNAME", "postgres")
password = os.getenv("POSTGRES_PASSWORD", "root")
port = os.getenv("POSTGRES_PORT", "5432")

DATABASE_URL = f"postgresql://{username}:{password}@{host}:{port}/{db}?client_encoding=utf8"
engine = create_engine(DATABASE_URL,encoding="utf8")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
