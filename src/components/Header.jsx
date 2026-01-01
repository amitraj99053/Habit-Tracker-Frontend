import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">✨</span>
                <span className="logo-text">HabitFlow</span>
            </div>
            <nav>
                <button className="nav-btn">Features</button>
                <button className="nav-btn primary">Get Started</button>
            </nav>
        </header>
    );
};

export default Header;
