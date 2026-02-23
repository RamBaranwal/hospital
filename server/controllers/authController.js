const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        await authService.registerUser(req.body);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        if (error.message === 'User already exists') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await authService.loginUser(email, password, role);
        res.status(200).json({ message: 'Login successful', user: { _id: user._id, name: user.name, role: user.role, email: user.email, department: user.department } });
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found' || error.message === 'Invalid credentials' || error.message === 'Please login through the correct portal') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    register,
    login
};
