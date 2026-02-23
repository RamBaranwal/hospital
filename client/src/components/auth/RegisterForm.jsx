import React, { useState } from 'react';

const RegisterForm = ({ role, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            {role === 'doctor' && (
                <div className="input-group">
                    <label>Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="General Medicine">General Medicine</option>
                    </select>
                </div>
            )}

            <div className="input-group">
                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">Register</button>
        </form>
    );
};

export default RegisterForm;
