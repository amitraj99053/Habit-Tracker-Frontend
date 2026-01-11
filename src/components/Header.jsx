import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUpModal from './SignUpModal';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initiallyLogin, setInitiallyLogin] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const openModal = (isLogin) => {
        setInitiallyLogin(isLogin);
        setIsModalOpen(true);
        setIsMobileMenuOpen(false); // Close menu when modal opens
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            <header className="header">
                <div className="logo" onClick={() => handleNavClick('/')}>
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">HabitFlow</span>
                </div>

                <div className="hamburger" onClick={toggleMenu}>
                    <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
                </div>

                <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <button
                        className={`nav-btn ${isActive('/') ? 'active' : ''}`}
                        onClick={() => handleNavClick('/')}
                    >
                        Home
                    </button>
                    <button
                        className={`nav-btn ${isActive('/services') ? 'active' : ''}`}
                        onClick={() => handleNavClick('/services')}
                    >
                        Features
                    </button>
                    <button
                        className={`nav-btn ${isActive('/contact') ? 'active' : ''}`}
                        onClick={() => handleNavClick('/contact')}
                    >
                        Contact
                    </button>
                    <div className="divider"></div>
                    {user ? (
                        <>
                            <span className="nav-btn user-greeting" style={{ cursor: 'default', color: '#fff' }}>Hi, {user.username}</span>
                            <button className="nav-btn secondary-btn" onClick={handleLogout} style={{ background: '#ff4d4d', color: '#fff' }}>Logout</button>
                        </>
                    ) : (
                        <button className="nav-btn secondary-btn" onClick={() => openModal(true)}>Log In</button>
                    )}
                </nav>
            </header>
            <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initiallyLogin={initiallyLogin}
            />
        </>
    );
};

export default Header;
