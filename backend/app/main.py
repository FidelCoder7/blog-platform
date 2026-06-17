from fastapi import FastAPI
from app.api.auth import router as auth_router

app = FastAPI(
    title="Blog Platform API",
    version="1.0.0"
)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Blog Platform API Running"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
