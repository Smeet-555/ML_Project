import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("dataset/processed/cardio_cleaned.csv", sep=";")

feature_cols = [
    'age_years', 'gender', 'height', 'weight', 'bmi',
    'ap_hi', 'ap_lo', 'cholesterol', 'gluc',
    'smoke', 'alco', 'active'
]

X = df[feature_cols]
y = df['cardio']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

model = LogisticRegression(random_state=42)
model.fit(X_train_scaled, y_train)

model_data = {
    "feature_cols": feature_cols,
    "intercept": float(model.intercept_[0]),
    "coefficients": model.coef_[0].tolist(),
    "mean": scaler.mean_.tolist(),
    "scale": scaler.scale_.tolist()
}

with open("models/model.json", "w") as f:
    json.dump(model_data, f, indent=2)

print("Logistic Regression model trained and saved to models/model.json")
