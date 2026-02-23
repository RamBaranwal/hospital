import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/Auth.css';

const Auth = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    // Normalize role to lower case to avoid case sensitivity issues
    const normalizedRole = role ? role.toLowerCase() : '';

    const API_URL = 'http://localhost:5000';

    const handleLogin = async (formData) => {
        try {
            const payload = { ...formData, role: normalizedRole };
            const res = await axios.post(`${API_URL}/login`, payload);

            if (res.data) {
                alert("Login Successful!");
                localStorage.setItem('user', JSON.stringify(res.data.user));
                if (res.data.user.role === 'patient') {
                    navigate('/patient-dashboard');
                } else if (res.data.user.role === 'doctor') {
                    navigate('/doctor-dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Login failed. Please check connectivity.");
        }
    };

    const handleRegister = async (formData) => {
        try {
            // Clean payload: Remove department if patient, ensure role is normalized
            const payload = {
                ...formData,
                role: normalizedRole,
                department: normalizedRole === 'doctor' ? formData.department : undefined
            };

            const endpoint = '/register';
            const res = await axios.post(`${API_URL}${endpoint}`, payload);

            if (res.data) {
                alert("Registration Successful! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className={`auth-container ${normalizedRole}`}>
            <div className="auth-box">
                <h2>{normalizedRole === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}</h2>
                <h3>{isLogin ? 'Login' : 'Register'}</h3>

                {error && <div className="error-msg">{error}</div>}

                {isLogin ? (
                    <LoginForm role={normalizedRole} onSubmit={handleLogin} />
                ) : (
                    <RegisterForm role={normalizedRole} onSubmit={handleRegister} />
                )}

                <p className="toggle-text">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? 'Register Here' : 'Login Here'}
                    </span>
                </p>

                <button className="back-btn" onClick={() => navigate('/')}>
                    Choose Different Role
                </button>
            </div>
        </div>
    );
};

export default Auth;
