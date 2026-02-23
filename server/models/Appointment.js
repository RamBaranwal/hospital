const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patientEmail: {
        type: String,
        required: false,
    },
    doctorEmail: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Storing as string YYYY-MM-DD for simplicity
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
