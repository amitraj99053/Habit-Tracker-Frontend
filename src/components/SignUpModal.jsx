import React, { useState } from 'react';
import './SignUpModal.css';

const SignUpModal = ({ isOpen, onClose, initiallyLogin = false }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isLogin, setIsLogin] = useState(initiallyLogin);

    // Update state when modal opens with new prop
    React.useEffect(() => {
        if (isOpen) {
            setIsLogin(initiallyLogin);
        }
    }, [isOpen, initiallyLogin]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const endpoint = isLogin ? '/auth/login' : '/auth/signup';

            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { username: formData.username, email: formData.email, password: formData.password };

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(isLogin ? 'Login successful!' : 'Account created successfully!');
                setTimeout(() => {
                    onClose();
                    setSuccess('');
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                }, 2000);
            } else {
                setError(data.message || (isLogin ? 'Login failed' : 'Signup failed'));
            }
        } catch (err) {
            console.error('Auth Error:', err);
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                {/* Header replaced by Tabs */}

                {error && (
                    <div className="error-message">
                        <span>⚠️</span> {error}
                    </div>
                )}
                {success && (
                    <div className="success-message">
                        <span>✅</span> {success}
                    </div>
                )}

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                    >
                        Log In
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-btn">{isLogin ? 'Log In' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
