import React from 'react';

const PatientNavbar = ({ activeTab, setActiveTab, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="logo" onClick={() => setActiveTab('view')}>BeHealthy</div>

            <div className="nav-links">
                <span
                    className={`nav-link ${activeTab === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveTab('view')}
                >
                    View Appointments
                </span>
                <span
                    className={`nav-link ${activeTab === 'book' ? 'active' : ''}`}
                    onClick={() => setActiveTab('book')}
                >
                    Book Appointment
                </span>
                <span
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default PatientNavbar;
