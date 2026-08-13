from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from api.predict import predict_cardio

app = FastAPI(title="CardioML Risk Prediction API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FRONTEND_DIR = Path(__file__).resolve().parent.parent.parent / "frontend"

@app.get("/")
def get_index():
    return FileResponse(FRONTEND_DIR / "index.html")

@app.get("/style.css")
def get_css():
    return FileResponse(FRONTEND_DIR / "style.css")

@app.get("/app.js")
def get_js():
    return FileResponse(FRONTEND_DIR / "app.js")

@app.post("/predict")
def predict(data: dict):
    return predict_cardio(data)
