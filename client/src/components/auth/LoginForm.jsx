import React, { useState } from 'react';

const LoginForm = ({ role, onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-btn">Login</button>
        </form>
    );
};

export default LoginForm;
