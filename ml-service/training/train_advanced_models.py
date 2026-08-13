from pathlib import Path
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "dataset" / "processed" / "cardio_cleaned.csv"
BEST_MODEL_PATH = BASE_DIR / "models" / "best_model.joblib"


def main():
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Cleaned dataset not found at {DATA_PATH}.")

    print("Loading cleaned dataset...")
    df = pd.read_csv(DATA_PATH, sep=";")

    feature_cols = [
        'age_years', 'gender', 'height', 'weight', 'bmi',
        'ap_hi', 'ap_lo', 'cholesterol', 'gluc',
        'smoke', 'alco', 'active'
    ]

    X = df[feature_cols]
    y = df['cardio']

    # Train / Test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    print("\n--- Week 5: Advanced Model Training & Cross-Validation ---")

    # 1. Random Forest with Hyperparameter Tuning
    print("\n1. Hyperparameter Tuning for Random Forest Classifier...")
    rf_param_grid = {
        'n_estimators': [50, 100],
        'max_depth': [5, 10],
        'min_samples_split': [5, 10]
    }
    rf = RandomForestClassifier(random_state=42)
    grid_search_rf = GridSearchCV(rf, rf_param_grid, cv=skf, scoring='accuracy', n_jobs=-1)
    grid_search_rf.fit(X_train, y_train)

    best_rf = grid_search_rf.best_estimator_
    rf_cv_scores = cross_val_score(best_rf, X_train, y_train, cv=skf, scoring='accuracy')

    # 2. Gradient Boosting Classifier
    print("2. Training Gradient Boosting Classifier...")
    gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    gb.fit(X_train, y_train)
    gb_cv_scores = cross_val_score(gb, X_train, y_train, cv=skf, scoring='accuracy')

    # Evaluations on Test Set
    rf_test_pred = best_rf.predict(X_test)
    gb_test_pred = gb.predict(X_test)

    rf_test_acc = accuracy_score(y_test, rf_test_pred)
    gb_test_acc = accuracy_score(y_test, gb_test_pred)

    rf_test_f1 = f1_score(y_test, rf_test_pred)
    gb_test_f1 = f1_score(y_test, gb_test_pred)

    rf_test_auc = roc_auc_score(y_test, best_rf.predict_proba(X_test)[:, 1])
    gb_test_auc = roc_auc_score(y_test, gb.predict_proba(X_test)[:, 1])

    # Model comparison summary table
    comparison_data = [
        {
            "Model": "Random Forest (Tuned)",
            "Best Params": str(grid_search_rf.best_params_),
            "5-Fold CV Mean Acc": f"{np.mean(rf_cv_scores) * 100:.2f}% (±{np.std(rf_cv_scores) * 100:.2f}%)",
            "Test Accuracy": f"{rf_test_acc * 100:.2f}%",
            "Test F1-Score": f"{rf_test_f1:.4f}",
            "Test ROC-AUC": f"{rf_test_auc:.4f}"
        },
        {
            "Model": "Gradient Boosting",
            "Best Params": "{'n_estimators': 100, 'max_depth': 5}",
            "5-Fold CV Mean Acc": f"{np.mean(gb_cv_scores) * 100:.2f}% (±{np.std(gb_cv_scores) * 100:.2f}%)",
            "Test Accuracy": f"{gb_test_acc * 100:.2f}%",
            "Test F1-Score": f"{gb_test_f1:.4f}",
            "Test ROC-AUC": f"{gb_test_auc:.4f}"
        }
    ]

    summary_df = pd.DataFrame(comparison_data)
    print("\n" + "=" * 90)
    print(" ADVANCED MODEL COMPARISON & CROSS-VALIDATION SUMMARY (WEEK 5)")
    print("=" * 90)
    print(summary_df.to_string(index=False))

    # Save best performing model (Gradient Boosting or Tuned RF)
    best_model = gb if gb_test_acc >= rf_test_acc else best_rf
    best_name = "Gradient Boosting" if gb_test_acc >= rf_test_acc else "Random Forest (Tuned)"
    BEST_MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(best_model, BEST_MODEL_PATH)
    print(f"\nBest model ({best_name}) saved to {BEST_MODEL_PATH}")


if __name__ == "__main__":
    main()
