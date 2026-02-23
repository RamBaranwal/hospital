const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['doctor', 'patient'],
        required: true,
    },
    department: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    }
});

module.exports = mongoose.model('User', UserSchema);
