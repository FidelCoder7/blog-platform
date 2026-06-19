from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.posts import router as posts_router

app = FastAPI(
    title="Blog Platform API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(posts_router)

@app.get("/")
def root():
    return {"message": "Blog Platform API Running"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
