const Appointment = require('../models/Appointment');

const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;
        // Populate patient details (name) from User model
        const appointments = await Appointment.find({ doctorId })
            .populate('patientId', 'name email')
            .sort({ date: 1, timeSlot: 1 });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'confirmed', 'cancelled', 'completed', 'rejected'

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: `Appointment ${status}`, appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDoctorAppointments,
    updateAppointmentStatus
};
