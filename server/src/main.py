from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from src.dependencies import get_database_session
from src.routes import admin_route, product_route, auth_route, product_category_route

app = FastAPI(dependencies=[Depends(get_database_session)])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://0.0.0.0:8000", "http://localhost", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_route.router)
app.include_router(admin_route.router)
app.include_router(product_category_route.router)
app.include_router(product_route.router)


@app.get("/")
async def root():
    return {"message": "Sales Management System"}



