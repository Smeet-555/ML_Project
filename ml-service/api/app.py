# pyrefly: ignore [missing-import]
from fastapi import FastAPI
from api.predict import predict_cardio

app = FastAPI()

@app.post("/predict")
def predict(data: dict):
    return predict_cardio(data)

