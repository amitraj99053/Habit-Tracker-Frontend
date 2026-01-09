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
                    <button className="nav-btn" onClick={() => navigate('/contact')}>Contact</button>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }}></div>
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
