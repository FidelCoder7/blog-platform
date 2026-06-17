from fastapi import FastAPI

app = FastAPI(
    title="Blog Platform API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Blog Platform API Running"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
