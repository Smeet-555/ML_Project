from fastapi import FastAPI

app = FastAPI(title="CardioPredict ML Service")

@app.get("/health")
def health():
    return {"status": "ok"}

