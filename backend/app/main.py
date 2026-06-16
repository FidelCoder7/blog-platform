from fastapi import FastAPI

app = FastAPI(
    title="Blog Platform API"
)

@app.get("/")
def root():
    return {"message": "Blog Platform API Running"}