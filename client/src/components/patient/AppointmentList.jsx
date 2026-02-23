import React from 'react';

const AppointmentList = ({ appointments, onCancelAppointment, isHistory }) => {

    if (appointments.length === 0) {
        if (isHistory) {
            return (
                <div className="history-section">
                    <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>No history available.</p>
                </div>
            );
        } else {
            return (
                <div className="quote-container">
                    <h1 className="quote-text">"The greatest wealth is health."</h1>
                    <p className="quote-author">- Virgil</p>
                </div>
            );
        }
    }

    return (
        <div className={isHistory ? "history-section" : "view-appointments-section"}>
            {isHistory && <h2>Appointment History</h2>}

            <div className="appointments-list-container">
                {appointments.map((appt) => (
                    <div key={appt._id} className={`appointment-card ${isHistory ? 'history' : ''}`}>
                        <h3>{appt.department}</h3>
                        <p><strong>Doctor:</strong> Dr. {appt.doctorId?.name || 'Unknown'}</p>
                        <p><strong>Date:</strong> {appt.date}</p>
                        <p><strong>Time:</strong> {appt.timeSlot}</p>
                        <p><strong>Status:</strong> <span className={`status ${appt.status}`}>
                            {appt.status === 'confirmed' ? 'Accepted' : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span></p>

                        {!isHistory && appt.status !== 'cancelled' && (
                            <button
                                className="cancel-btn"
                                onClick={() => onCancelAppointment(appt._id)}
                            >
                                Cancel Appointment
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentList;
