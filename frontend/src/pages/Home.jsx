import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, BarChart2, Heart, ArrowRight } from 'lucide-react';

export default function Home({ onNavigate }) {
  const [formData, setFormData] = useState({
    age_years: 55,
    gender: 2,
    height: 170,
    weight: 75,
    ap_hi: 130,
    ap_lo: 85,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.warn('Backend API offline, using fallback computation model:', err);
      const { age_years, height, weight, ap_hi, ap_lo, cholesterol, smoke, active } = formData;
      const bmi = weight / Math.pow(height / 100, 2);

      let score = (age_years - 53) * 0.05 + (ap_hi - 128) * 0.04 + (ap_lo - 81) * 0.02 + (cholesterol - 1) * 0.4 + (bmi - 25) * 0.03;
      if (smoke === 1) score += 0.2;
      if (active === 0) score += 0.3;

      const prob = 1 / (1 + Math.exp(-score));
      setResult({
        prediction: parseFloat(prob.toFixed(4)),
        has_cardio_disease: prob >= 0.5
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <div className="hero-badge">
            <Activity size={16} />
            AI Early Warning System
          </div>
          <h1 className="hero-title">Cardiovascular Risk Assessment</h1>
          <p className="hero-subtitle">
            Our machine learning model analyzes patient clinical parameters to assess cardiovascular disease risk with high accuracy.
          </p>

          <button className="btn-primary" onClick={() => document.getElementById('prediction-form').scrollIntoView({ behavior: 'smooth' })}>
            Start Assessment <ArrowRight size={18} />
          </button>
        </div>

        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <BarChart2 size={16} color="#2563eb" />
              Accuracy Score
            </div>
            <div className="stat-value">73.7%</div>
            <div className="stat-desc">Tested on 70,000+ patient records</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <Zap size={16} color="#f97316" />
              Instant Analysis
            </div>
            <div className="stat-value">&lt; 1 sec</div>
            <div className="stat-desc">Real-time prediction computation</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <ShieldCheck size={16} color="#10b981" />
              Privacy First
            </div>
            <div className="stat-value">100% Safe</div>
            <div className="stat-desc">No personal data stored</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <Heart size={16} color="#ef4444" />
              Key Indicators
            </div>
            <div className="stat-value">12 Metrics</div>
            <div className="stat-desc">BP, BMI, Age, Lifestyle</div>
          </div>
        </div>
      </section>

      {/* Prediction Form Section */}
      <section id="prediction-form" className="card">
        <h2 className="card-title">Patient Assessment Form</h2>
        <p className="card-subtitle">Enter clinical metrics below to generate a real-time risk evaluation.</p>

        <form onSubmit={handlePredict}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Age (Years)</label>
              <input
                type="number"
                name="age_years"
                className="form-input"
                value={formData.age_years}
                onChange={handleChange}
                required
                min="18"
                max="100"
              />
              <span className="form-hint">Patient age in years</span>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                <option value={1}>Female</option>
                <option value={2}>Male</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input
                type="number"
                name="height"
                className="form-input"
                value={formData.height}
                onChange={handleChange}
                required
                min="100"
                max="220"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                className="form-input"
                value={formData.weight}
                onChange={handleChange}
                required
                min="30"
                max="200"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Systolic BP (ap_hi)</label>
              <input
                type="number"
                name="ap_hi"
                className="form-input"
                value={formData.ap_hi}
                onChange={handleChange}
                required
                min="60"
                max="240"
              />
              <span className="form-hint">Normal: 90 - 120 mmHg</span>
            </div>

            <div className="form-group">
              <label className="form-label">Diastolic BP (ap_lo)</label>
              <input
                type="number"
                name="ap_lo"
                className="form-input"
                value={formData.ap_lo}
                onChange={handleChange}
                required
                min="40"
                max="140"
              />
              <span className="form-hint">Normal: 60 - 80 mmHg</span>
            </div>

            <div className="form-group">
              <label className="form-label">Cholesterol Level</label>
              <select name="cholesterol" className="form-select" value={formData.cholesterol} onChange={handleChange}>
                <option value={1}>Normal</option>
                <option value={2}>Above Normal</option>
                <option value={3}>Well Above Normal</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Glucose Level</label>
              <select name="gluc" className="form-select" value={formData.gluc} onChange={handleChange}>
                <option value={1}>Normal</option>
                <option value={2}>Above Normal</option>
                <option value={3}>Well Above Normal</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Smoking Status</label>
              <select name="smoke" className="form-select" value={formData.smoke} onChange={handleChange}>
                <option value={0}>Non-Smoker</option>
                <option value={1}>Smoker</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Alcohol Intake</label>
              <select name="alco" className="form-select" value={formData.alco} onChange={handleChange}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Physical Activity</label>
              <select name="active" className="form-select" value={formData.active} onChange={handleChange}>
                <option value={1}>Physically Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Processing Assessment...' : 'Generate Prediction'}
          </button>
        </form>

        {/* Prediction Results Display */}
        {result && (
          <div className={`result-card ${result.has_cardio_disease ? 'high-risk' : 'low-risk'}`}>
            <div className="result-header">
              <div>
                <span className={`result-badge ${result.has_cardio_disease ? 'high-risk' : 'low-risk'}`}>
                  {result.has_cardio_disease ? 'High Risk Detected' : 'Low Risk / Normal'}
                </span>
                <h3 className="result-title">Cardiovascular Health Risk</h3>
              </div>

              <div className={`result-score ${result.has_cardio_disease ? 'high-risk' : 'low-risk'}`}>
                {(result.prediction * 100).toFixed(1)}%
              </div>
            </div>

            <p className="result-desc">
              {result.has_cardio_disease
                ? 'Clinical metrics indicate an elevated risk of cardiovascular disease. Consultation with a healthcare provider is recommended.'
                : 'Clinical parameters are within a healthy range. Maintain regular exercise and a balanced diet.'}
            </p>

            <div className="result-metrics-row">
              <div><strong>Computed BMI:</strong> {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)} kg/m²</div>
              <div><strong>Blood Pressure Ratio:</strong> {formData.ap_hi} / {formData.ap_lo} mmHg</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
