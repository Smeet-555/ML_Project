# pyrefly: ignore [missing-import]
from fastapi.testclient import TestClient
from api.app import app

client = TestClient(app)

def test_predict():
    sample_patient = {
        "age_years": 55,
        "gender": 2,
        "height": 172.0,
        "weight": 85.0,
        "ap_hi": 140.0,
        "ap_lo": 90.0,
        "cholesterol": 2,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1
    }
    response = client.post("/predict", json=sample_patient)
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "has_cardio_disease" in data

if __name__ == "__main__":
    test_predict()
    print("API test passed successfully!")
