const User = require('../models/User');

const registerUser = async (userData) => {
    const { name, email, password, role, department } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = new User({ name, email, password, role, department });
    return await newUser.save();
};

const loginUser = async (email, password, role) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (role && user.role !== role) {
        throw new Error('Please login through the correct portal');
    }
    if (user.password !== password) {
        throw new Error('Invalid credentials');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser
};
