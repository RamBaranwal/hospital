import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/:role" element={<Auth />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
