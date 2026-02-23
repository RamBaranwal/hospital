const User = require('../models/User');

const getDoctorsByDepartment = async (req, res) => {
    try {
        const { department } = req.query;
        const doctors = await User.find({ role: 'doctor', department }).select('name _id');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDoctorsByDepartment
};
