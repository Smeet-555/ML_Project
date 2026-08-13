import React from 'react';
import { Cpu } from 'lucide-react';

export default function ModelInfo() {
  const models = [
    {
      name: 'Decision Tree Classifier',
      type: 'Tree Classifier',
      accuracy: '73.15%',
      f1: '0.7137',
      status: 'Trained Model',
      active: true
    },
    {
      name: 'Logistic Regression',
      type: 'Linear Classification',
      accuracy: '72.71%',
      f1: '0.7072',
      status: 'Trained Model',
      active: true
    }
  ];

  const features = [
    { name: 'Systolic Blood Pressure (ap_hi)', importance: '78.37%' },
    { name: 'Age (Years)', importance: '12.28%' },
    { name: 'Cholesterol Level', importance: '7.45%' },
    { name: 'Glucose Level', importance: '0.72%' }
  ];

  return (
    <div>
      <div className="card">
        <h2 className="card-title">
          <Cpu color="#2563eb" /> Model Performance & Benchmark Details
        </h2>
        <p className="card-subtitle">Comprehensive metrics evaluated across dataset records (Week 4 Evaluation).</p>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>MODEL NAME</th>
                <th>ALGORITHM TYPE</th>
                <th>ACCURACY</th>
                <th>F1 SCORE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, idx) => (
                <tr key={idx}>
                  <td className="model-name-cell">{m.name}</td>
                  <td>{m.type}</td>
                  <td className="accuracy-cell">{m.accuracy}</td>
                  <td>{m.f1}</td>
                  <td>
                    <span className="status-tag active">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="card-title">Key Feature Importance (Decision Tree)</h3>

        <div className="feature-list">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <span className="feature-name">{f.name}</span>
              <span className="feature-value">{f.importance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
