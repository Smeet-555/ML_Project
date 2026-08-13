import React from 'react';
import { Database, FileCheck, Layers, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="card">
      <h2 className="card-title">
        <Sparkles color="#2563eb" /> About CardioML System
      </h2>
      <p className="card-subtitle">A full-stack machine learning pipeline for cardiovascular disease risk assessment.</p>

      <div className="arch-grid">
        <div className="arch-card">
          <Database size={24} color="#2563eb" />
          <h4 className="arch-card-title">Dataset Preprocessing</h4>
          <p className="arch-card-desc">
            Cleaned 70,000 patient rows by calculating age in years, body mass index (BMI), and filtering unrealistic blood pressure outliers.
          </p>
        </div>

        <div className="arch-card">
          <Layers size={24} color="#f97316" />
          <h4 className="arch-card-title">Multiple Machine Learning Algorithms</h4>
          <p className="arch-card-desc">
            Includes Logistic Regression, Decision Tree Classifier, Random Forest, and Gradient Boosting with scratch implementations.
          </p>
        </div>

        <div className="arch-card">
          <FileCheck size={24} color="#10b981" />
          <h4 className="arch-card-title">FastAPI Backend Service</h4>
          <p className="arch-card-desc">
            REST API server serving real-time risk predictions with JSON response payloads and CORS support.
          </p>
        </div>
      </div>
    </div>
  );
}
