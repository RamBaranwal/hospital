import React from 'react';

const BookingForm = ({
    bookingData,
    onChange,
    onSubmit,
    departments,
    doctors,
    timeSlots,
    unavailableSlots = [],
    minDate
}) => {
    return (
        <div className="book-appointment-section">
            <h2>Book Your Appointment</h2>
            <form className="booking-form" onSubmit={onSubmit}>

                {/* Department Selection */}
                <div className="input-group">
                    <label>Department</label>
                    <select
                        name="department"
                        value={bookingData.department}
                        onChange={onChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                {/* Doctor Selection (Dynamic) */}
                <div className="input-group">
                    <label>Doctor</label>
                    <select
                        name="doctorId"
                        value={bookingData.doctorId}
                        onChange={onChange}
                        disabled={!bookingData.department}
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map(doc => (
                            <option key={doc._id} value={doc._id}>{doc.name}</option>
                        ))}
                    </select>
                </div>

                {/* Date Selection */}
                <div className="input-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        min={minDate}
                        onChange={onChange}
                        required
                    />
                </div>

                {/* Time Slot Selection */}
                <div className="input-group">
                    <label>Time Slot</label>
                    <select
                        name="timeSlot"
                        value={bookingData.timeSlot}
                        onChange={onChange}
                        required
                    >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map(slot => (
                            <option
                                key={slot}
                                value={slot}
                                disabled={unavailableSlots.includes(slot)}
                            >
                                {slot} {unavailableSlots.includes(slot) ? '(Booked)' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="book-btn">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;
