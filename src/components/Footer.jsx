import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Brand Column */}
                <div className="footer-col brand-col">
                    <div className="footer-logo">
                        <span className="logo-icon">✨</span>
                        <span className="logo-text">HabitFlow</span>
                    </div>
                    <p className="footer-tagline">
                        Master your daily routine with the #1 habit tracking platform designed for high performers.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
                        <a href="#" className="social-icon" aria-label="Instagram">📸</a>
                        <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
                        <a href="#" className="social-icon" aria-label="Discord">💬</a>
                    </div>
                </div>

                {/* Navigation Columns */}
                <div className="footer-col">
                    <h4>Product</h4>
                    <ul className="footer-links-list">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Integrations</a></li>
                        <li><a href="#">Changelog</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Resources</h4>
                    <ul className="footer-links-list">
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Habit Guide</a></li>
                        <li><a href="#">API Docs</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="footer-col newsletter-col">
                    <h4>Stay Updated</h4>
                    <p>Join 25,000+ others getting tips on productivity.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button type="button">→</button>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
                <div className="legal-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
