import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initiallyLogin, setInitiallyLogin] = useState(false);

    const openModal = (isLogin) => {
        setInitiallyLogin(isLogin);
        setIsModalOpen(true);
    };

    return (
        <>
            <header className="header">
                <div className="logo" onClick={() => navigate('/')}>
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">HabitFlow</span>
                </div>
                <nav>
                    <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
                    <button className="nav-btn" onClick={() => navigate('/services')}>Features</button>
                    <button className="nav-btn" onClick={() => navigate('/services')}>Contact</button>
                    <button className="nav-btn secondary-btn" onClick={() => openModal(true)}>Log In</button>
                    <button className="nav-btn primary" onClick={() => openModal(false)}>Sign Up</button>
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
