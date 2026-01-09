import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initiallyLogin, setInitiallyLogin] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <button className="nav-btn" onClick={() => handleNavClick('/')}>Home</button>
                    <button className="nav-btn" onClick={() => handleNavClick('/services')}>Features</button>
                    <button className="nav-btn" onClick={() => handleNavClick('/contact')}>Contact</button>
                    <div className="divider"></div>
                    <button className="nav-btn secondary-btn" onClick={() => openModal(true)}>Log In</button>
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
