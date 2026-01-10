import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/authService';
import './SignUpModal.css';

const SignUpModal = ({ isOpen, onClose, initiallyLogin = false }) => {
    const { login } = useAuth();
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
            let data;
            if (isLogin) {
                data = await authService.login(formData.email, formData.password);
                setSuccess('Login successful!');
            } else {
                data = await authService.signup(formData.username, formData.email, formData.password);
                setSuccess('Account created successfully!');
            }

            // Update global auth state
            login(data);

            setTimeout(() => {
                onClose();
                setSuccess('');
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            }, 2000);

        } catch (err) {
            console.error('Auth Error:', err);
            // Handle timeout or network errors specifically
            if (err.message.includes('timed out') || err.message.includes('Failed to fetch')) {
                setError('Unable to connect to server. Please check your internet or try again later.');
            } else {
                setError(err.message || 'Authentication failed');
            }
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
                        {isLogin && (
                            <div className="forgot-password">
                                <span onClick={() => alert("Password reset feature coming soon!")}>
                                    Forgot Password?
                                </span>
                            </div>
                        )}
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
