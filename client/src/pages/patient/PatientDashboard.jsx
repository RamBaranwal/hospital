import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PatientNavbar from '../../components/patient/PatientNavbar';
import AppointmentList from '../../components/patient/AppointmentList';
import BookingForm from '../../components/patient/BookingForm';
import '../../styles/PatientDashboard.css';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('view'); // 'view', 'book', 'history'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // Booking State
    const [departments] = useState(['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine']);
    const [doctors, setDoctors] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const [bookingData, setBookingData] = useState({
        department: '',
        doctorId: '',
        date: '',
        timeSlot: ''
    });

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [unavailableSlots, setUnavailableSlots] = useState([]);

    // Generate Time Slots (9am - 2pm, 15min)
    const generateTimeSlots = () => {
        const slots = [];
        let startTime = 9 * 60; // 9 AM in minutes
        const endTime = 14 * 60; // 2 PM in minutes

        while (startTime < endTime) {
            const hours = Math.floor(startTime / 60);
            const minutes = startTime % 60;
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours > 12 ? hours - 12 : hours; // 12-hour format
            const displayMinutes = minutes === 0 ? '00' : minutes;
            slots.push(`${displayHours}:${displayMinutes} ${period}`);
            startTime += 15;
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    useEffect(() => {
        if (!user || user.role !== 'patient') {
            navigate('/');
        } else {
            fetchAppointments();
        }
    }, [user, navigate]);

    // Fetch unavailable slots when doctor/date changes
    useEffect(() => {
        const fetchAvailability = async () => {
            if (bookingData.doctorId && bookingData.date) {
                try {
                    const res = await axios.get(`http://localhost:5000/api/appointments/availability`, {
                        params: {
                            doctorId: bookingData.doctorId,
                            date: bookingData.date
                        }
                    });
                    setUnavailableSlots(res.data);
                } catch (err) {
                    console.error("Error fetching availability", err);
                }
            } else {
                setUnavailableSlots([]);
            }
        };
        fetchAvailability();
    }, [bookingData.doctorId, bookingData.date]);

    // Reset doctor selection when department changes to prevent mismatch
    useEffect(() => {
        if (bookingData.department) {
            // Fetch doctors for selected department
            const fetchDoctors = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/doctors?department=${bookingData.department}`);
                    setDoctors(res.data);
                    // Clear previous doctor selection if not in new list (or just always clear for safety)
                    if (!res.data.find(d => d._id === bookingData.doctorId)) {
                        setBookingData(prev => ({ ...prev, doctorId: '' }));
                    }
                } catch (err) {
                    console.error("Error fetching doctors", err);
                }
            };
            fetchDoctors();
        } else {
            setDoctors([]);
            setBookingData(prev => ({ ...prev, doctorId: '' }));
        }
    }, [bookingData.department]); // Removed bookingData.doctorId dependency to avoid loops

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/appointments/patient/${user._id}`);
            setAllAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleBookingChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                patientId: user._id,
                ...bookingData
            };
            const res = await axios.post('http://localhost:5000/api/appointments/book', payload);
            alert(res.data.message);
            // Reset form and switch to view tab
            setBookingData({
                department: '',
                doctorId: '',
                date: '',
                timeSlot: ''
            });
            fetchAppointments();
            setActiveTab('view');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Booking failed");
        }
    };

    const handleCancelAppointment = async (apptId) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

        try {
            await axios.put(`http://localhost:5000/api/appointments/cancel/${apptId}`);
            alert("Appointment cancelled successfully");
            fetchAppointments(); // Refresh list
        } catch (err) {
            console.error(err);
            alert("Failed to cancel appointment");
        }
    };

    // Filter appointments for View vs History
    const activeAppointments = allAppointments.filter(appt =>
        ['pending', 'confirmed'].includes(appt.status)
    );

    const historyAppointments = allAppointments.filter(appt =>
        ['cancelled', 'completed', 'rejected'].includes(appt.status) // 'completed' is 'done'
    );

    return (
        <div className="patient-dashboard-container">
            <PatientNavbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
            />

            <div className="content-container">
                {activeTab === 'view' && (
                    <div className="view-appointments-section">
                        {activeAppointments.length === 0 ? (
                            <div className="quote-container">
                                <h1 className="quote-text">"The greatest wealth is health."</h1>
                                <p className="quote-author">- Virgil</p>
                            </div>
                        ) : (
                            <AppointmentList
                                appointments={activeAppointments}
                                onCancelAppointment={handleCancelAppointment}
                                isHistory={false}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'book' && (
                    <BookingForm
                        bookingData={bookingData}
                        onChange={handleBookingChange}
                        onSubmit={handleBookAppointment}
                        departments={departments}
                        doctors={doctors}
                        timeSlots={timeSlots}
                        unavailableSlots={unavailableSlots}
                        minDate={new Date().toISOString().split('T')[0]} // Prop passed
                    />
                )}

                {activeTab === 'history' && (
                    <AppointmentList
                        appointments={historyAppointments}
                        isHistory={true}
                    />
                )}
            </div>
        </div>
    );
};


export default PatientDashboard;
