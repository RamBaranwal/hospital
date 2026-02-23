import React from 'react';

const DoctorNavbar = ({ handleLogout }) => {
    return (
        <nav className="doctor-navbar">
            <div className="doctor-logo">BeHealthy <span style={{ fontSize: '0.8rem', color: '#666' }}>Doctor Panel</span></div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default DoctorNavbar;
