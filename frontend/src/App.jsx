import React, { useState } from 'react';
import Home from './pages/Home';
import ModelInfo from './pages/ModelInfo';
import About from './pages/About';
import { Heart, Activity } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <nav className="navbar">
        <a href="#" className="logo" onClick={() => setCurrentPage('home')}>
          <div className="logo-icon">
            <Heart size={20} fill="white" />
          </div>
          CardioML
        </a>

        <ul className="nav-links">
          <li>
            <a
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Assessment Form
            </a>
          </li>
          <li>
            <a
              className={`nav-link ${currentPage === 'model-info' ? 'active' : ''}`}
              onClick={() => setCurrentPage('model-info')}
            >
              Model Benchmarks
            </a>
          </li>
          <li>
            <a
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              Pipeline Architecture
            </a>
          </li>
        </ul>

        <button className="btn-primary" onClick={() => setCurrentPage('home')}>
          <Activity size={16} /> Predict Risk
        </button>
      </nav>

      {/* Main Content Body */}
      <main className="main-content">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'model-info' && <ModelInfo />}
        {currentPage === 'about' && <About />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 CardioML Assessment System. Developed for Computer Engineering ML Project SOP.</p>
      </footer>
    </div>
  );
}
