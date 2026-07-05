import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/authService';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        dob: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Load initial user details
    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                username: user.username || '',
                dob: user.dob || '',
                password: '',
                confirmPassword: ''
            });
            setError('');
            setSuccess('');
            setIsLoading(false);
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic checks
        if (formData.password) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
        }

        setIsLoading(true);

        try {
            const profileData = {
                username: formData.username.trim(),
                dob: formData.dob || null
            };

            if (formData.password) {
                profileData.password = formData.password;
            }

            // Call API
            const response = await authService.updateProfile(profileData);

            // Update local state / context
            updateUser(response.user);
            setSuccess('Profile updated successfully!');
            
            setTimeout(() => {
                onClose();
                setSuccess('');
            }, 2000);

        } catch (err) {
            console.error('Update Profile Error:', err);
            setError(err.message || 'Failed to update profile details');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={() => !isLoading && onClose()}>
            <div className="modal-content profile-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} disabled={isLoading}>&times;</button>
                
                <h2 className="modal-title">Account Settings</h2>
                <p className="modal-subtitle">Update your profile information and login credentials</p>

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

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="profile-label">Name / Username</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="username"
                                placeholder="Your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="profile-label">Date of Birth</label>
                        <div className="input-wrapper">
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="profile-date-input"
                            />
                        </div>
                    </div>

                    <div className="profile-password-section-title">
                        Change Password <span className="helper-text">(optional)</span>
                    </div>

                    <div className="form-group">
                        <label className="profile-label">New Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="password"
                                placeholder="Min 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="profile-label">Confirm New Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
