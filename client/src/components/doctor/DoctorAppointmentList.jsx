import React from 'react';

const DoctorAppointmentList = ({ appointments, type, onStatusUpdate }) => {
    if (appointments.length === 0) {
        return <p>No {type === 'pending' ? 'pending requests' : 'upcoming appointments'}.</p>;
    }

    return (
        <div className="appointments-grid">
            {appointments.map(appt => (
                <div
                    key={appt._id}
                    className="doctor-card"
                    style={type === 'upcoming' ? { borderLeftColor: '#28a745' } : {}}
                >
                    <h4>{appt.patientId?.name || 'Unknown Patient'}</h4>
                    <p>Date: {appt.date}</p>
                    <p>Time: {appt.timeSlot}</p>

                    {type === 'pending' ? (
                        <div className="actions">
                            <button
                                className="action-btn confirm-btn"
                                onClick={() => onStatusUpdate(appt._id, 'confirmed')}
                            >
                                Accept
                            </button>
                            <button
                                className="action-btn cancel-btn"
                                onClick={() => onStatusUpdate(appt._id, 'cancelled')}
                            >
                                Decline
                            </button>
                        </div>
                    ) : (
                        <>
                            <span className="status confirmed">Confirmed</span>
                            <button
                                className="action-btn cancel-btn"
                                style={{ marginTop: '10px', display: 'block' }}
                                onClick={() => onStatusUpdate(appt._id, 'cancelled')}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DoctorAppointmentList;
