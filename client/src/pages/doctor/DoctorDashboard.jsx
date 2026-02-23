import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import '../../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'doctor') {
            navigate('/');
        } else {
            fetchAppointments();
        }
    }, [user, navigate]);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/doctor-panel/${user._id}/appointments`);
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments", err);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/doctor-panel/appointment/${id}`, { status });
            // Optimistic update
            setAppointments(appointments.map(appt =>
                appt._id === id ? { ...appt, status } : appt
            ));
        } catch (err) {
            console.error("Error updating status", err);
            alert("Failed to update status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Sort appointments by date and time
    const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.timeSlot);
        const dateB = new Date(b.date + ' ' + b.timeSlot);
        return dateA - dateB;
    });

    return (
        <div className="doctor-dashboard-container">
            <DoctorNavbar handleLogout={handleLogout} />

            <div className="doctor-content-container">
                <div className="dashboard-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>BeHealthy Doctor Portal</h1>
                    <h2 style={{ fontSize: '1.5rem', color: '#4a5568', fontWeight: '500' }}>
                        Welcome, Dr. {user?.name} <span style={{ margin: '0 10px', color: '#cbd5e0' }}>|</span> <span style={{ fontSize: '1.1rem', color: '#718096' }}>Department: {user?.department || 'General'}</span>
                    </h2>
                </div>

                <div className="dashboard-section">
                    <h3>All Appointments</h3>
                    {sortedAppointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedAppointments.map((appt) => (
                                    <tr key={appt._id}>
                                        <td>{appt.patientId?.name || 'Unknown Patient'}</td>
                                        <td>{appt.date}</td>
                                        <td>{appt.timeSlot}</td>
                                        <td>
                                            <span className={`status-badge ${appt.status || 'pending'}`}>
                                                {(appt.status || 'pending').charAt(0).toUpperCase() + (appt.status || 'pending').slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {(appt.status === 'pending' || !appt.status) && (
                                                    <>
                                                        <button
                                                            className="btn-accept"
                                                            onClick={() => handleStatusUpdate(appt._id, 'confirmed')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn-reject"
                                                            onClick={() => handleStatusUpdate(appt._id, 'rejected')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {appt.status === 'confirmed' && (
                                                    <button
                                                        className="btn-done"
                                                        onClick={() => handleStatusUpdate(appt._id, 'completed')}
                                                    >
                                                        Done
                                                    </button>
                                                )}
                                                {['completed', 'cancelled', 'rejected'].includes(appt.status) && (
                                                    <span style={{ color: '#888' }}>No actions</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
