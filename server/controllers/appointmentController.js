const Appointment = require('../models/Appointment');
const User = require('../models/User');

const bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, department, date, timeSlot } = req.body;

        // Basic validation
        if (!patientId || !doctorId || !department || !date || !timeSlot) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Fetch users to get emails
        const patient = await User.findById(patientId);
        const doctor = await User.findById(doctorId);

        if (!patient || !doctor) {
            return res.status(404).json({ message: 'Patient or Doctor not found' });
        }

        // Create new appointment
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            patientEmail: patient.email,
            doctorEmail: doctor.email,
            department,
            date,
            timeSlot
        });

        await newAppointment.save();

        // Push to Patient (if profile exists)
        try {
            const Patient = require('../models/Patient');
            await Patient.findOneAndUpdate(
                { user: patientId },
                { $push: { appointments: newAppointment._id } }
            );
        } catch (err) {
            console.log("Error updating Patient profile appointments", err);
        }

        // Push to Doctor (if profile exists)
        try {
            const Doctor = require('../models/Doctor');
            await Doctor.findOneAndUpdate(
                { user: doctorId },
                { $push: { appointments: newAppointment._id } }
            );
        } catch (err) {
            console.log("Error updating Doctor profile appointments", err);
        }

        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.params;
        // Populate doctor details to show name
        const appointments = await Appointment.find({ patientId }).populate('doctorId', 'name').sort({ date: 1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const checkAvailability = async (req, res) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ message: 'Doctor ID and date are required' });
        }

        // Find all appointments for this doctor on this date that are NOT cancelled or rejected
        const appointments = await Appointment.find({
            doctorId,
            date,
            status: { $in: ['pending', 'confirmed', 'completed'] }
        });

        const bookedSlots = appointments.map(appt => appt.timeSlot);
        res.status(200).json(bookedSlots);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    bookAppointment,
    getPatientAppointments,
    cancelAppointment,
    checkAvailability
};
