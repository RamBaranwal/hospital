import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css'; // Reusing landing styles for now

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return (
            <div className="landing-container">
                <div className="content">
                    <h1>Access Denied</h1>
                    <p>Please login to view this page.</p>
                    <button className="submit-btn" onClick={() => navigate('/')}>Go to Home</button>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="landing-container">
            <div className="content">
                <h1>Welcome, {user.name}!</h1>
                <h2>Role: {user.role === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}</h2>
                <p>You have successfully logged in.</p>

                <div className="card-container">
                    <div className="card">
                        <h3>Your Data</h3>
                        <p><strong>Email:</strong> {user.email || 'Not displayed'}</p>
                        <p>This data is retrieved from your MongoDB Database.</p>
                    </div>
                </div>

                <button
                    className="submit-btn"
                    style={{ marginTop: '2rem', background: '#d9534f', width: '200px' }}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
