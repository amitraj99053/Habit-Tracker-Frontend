import React, { useState } from 'react';
import SignUpModal from './SignUpModal';
import './Header.css';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">HabitFlow</span>
                </div>
                <nav>
                    <button className="nav-btn">Features</button>
                    <button className="nav-btn primary" onClick={() => setIsModalOpen(true)}>Sign Up</button>
                </nav>
            </header>
            <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
