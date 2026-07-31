import json

with open("models/model.json", "r") as f:
    model_data = json.load(f)

feature_cols = model_data["feature_cols"]
intercept = model_data["intercept"]
coefs = model_data["coefficients"]
means = model_data["mean"]
scales = model_data["scale"]

def predict_cardio(data: dict) -> dict:
    if "bmi" not in data and "height" in data and "weight" in data:
        data["bmi"] = round(data["weight"] / ((data["height"] / 100) ** 2), 2)

    score = intercept
    for col, coef, mean, scale in zip(feature_cols, coefs, means, scales):
        val = data.get(col, 0)
        scaled_val = (val - mean) / scale
        score += coef * scaled_val

    return {
        "prediction": round(score, 4),
        "has_cardio_disease": score >= 0.5
    }
