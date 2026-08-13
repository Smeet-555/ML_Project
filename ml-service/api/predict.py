import json
import math
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "model.json"

with open(MODEL_PATH, "r") as f:
    model_data = json.load(f)

feature_cols = model_data["feature_cols"]
intercept = model_data["intercept"]
coefs = model_data["coefficients"]
means = model_data["mean"]
scales = model_data["scale"]

def predict_cardio(data: dict) -> dict:
    if "bmi" not in data and "height" in data and "weight" in data:
        data["bmi"] = round(data["weight"] / ((data["height"] / 100) ** 2), 2)

    z = intercept
    for col, coef, mean, scale in zip(feature_cols, coefs, means, scales):
        val = data.get(col, 0)
        scaled_val = (val - mean) / scale
        z += coef * scaled_val

    probability = 1.0 / (1.0 + math.exp(-z))

    return {
        "prediction": round(probability, 4),
        "has_cardio_disease": probability >= 0.5
    }
