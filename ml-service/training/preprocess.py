import os
import pandas as pd
import numpy as np

def clean_data(df):
    """
    Cleans the dataset by removing outliers and unrealistic values:
    - ap_hi (systolic blood pressure) should be between 50 and 250 mmHg
    - ap_lo (diastolic blood pressure) should be between 30 and 150 mmHg
    - ap_hi should be strictly greater than ap_lo
    - height should be between 100 and 220 cm
    - weight should be between 30 and 200 kg
    """
    print("Cleaning dataset and filtering outliers...")
    initial_shape = df.shape
    
    # Create age in years feature if not already present
    if 'age_years' not in df.columns:
        df['age_years'] = df['age'] // 365
        
    # Calculate BMI (Body Mass Index)
    if 'bmi' not in df.columns:
        df['bmi'] = (df['weight'] / ((df['height'] / 100) ** 2)).round(2)

    
    # Filter unrealistic blood pressures
    df = df[(df['ap_hi'] >= 50) & (df['ap_hi'] <= 250)]
    df = df[(df['ap_lo'] >= 30) & (df['ap_lo'] <= 150)]
    df = df[df['ap_hi'] > df['ap_lo']]
    
    # Filter height and weight outliers
    df = df[(df['height'] >= 100) & (df['height'] <= 220)]
    df = df[(df['weight'] >= 30) & (df['weight'] <= 200)]
    
    final_shape = df.shape
    print(f"Data cleaned. Rows reduced from {initial_shape[0]} to {final_shape[0]}.")
    return df

if __name__ == "__main__":
    # Define paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'dataset', 'cardio_train.csv')
    output_dir = os.path.join(base_dir, 'dataset', 'processed')
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'cardio_cleaned.csv')
    
    if os.path.exists(data_path):
        # Load
        df = pd.read_csv(data_path, sep=';')
        print(f"Loaded raw data: {df.shape}")
        
        # Clean
        df_cleaned = clean_data(df)
        
        # Save
        df_cleaned.to_csv(output_path, index=False, sep=';')
        print(f"Cleaned dataset saved to {output_path}")
    else:
        print(f"Dataset not found at {data_path}. Please check the directory path.")
