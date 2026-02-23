import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className={`creative-landing ${hoveredSide ? `hover-${hoveredSide}` : ''}`}>
      {/* Central Floating Brand */}
      <div className="center-brand">
        <div className="brand-circle">
          <h1>Be<span>Healthy</span></h1>
          <p>Select Portal</p>
        </div>
      </div>

      {/* Left Side - Patient */}
      <div
        className="split-side patient-side"
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/auth/patient')}
      >
        <div className="side-content">
          <div className="floating-icon">🤒</div>
          <h2>For Patients</h2>
          <p className="description">
            Book appointments, access medical records, and connect with top specialists instantly.
          </p>
          <button className="action-btn">Enter Patient Portal</button>
        </div>
        <div className="bg-pattern"></div>
      </div>

      {/* Right Side - Doctor */}
      <div
        className="split-side doctor-side"
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/auth/doctor')}
      >
        <div className="side-content">
          <div className="floating-icon">👨‍⚕️</div>
          <h2>For Doctors</h2>
          <p className="description">
            Manage your schedule, streamline patient data, and grow your medical practice.
          </p>
          <button className="action-btn">Enter Doctor Portal</button>
        </div>
        <div className="bg-pattern"></div>
      </div>
    </div>
  );
};

export default Landing;
