import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Simple Brand */}
                <div className="footer-brand">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">HabitFlow</span>
                </div>



                {/* Minimal Socials */}
                <div className="footer-socials">
                    <a href="https://github.com/amitraj99053" aria-label="GitHub"><Github size={20} /></a>
                    <a href="https://www.instagram.com/__amit__kr_01/" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="https://www.linkedin.com/in/amit-kumar-654895220/" aria-label="LinkedIn"><Linkedin size={20} /></a>
                </div>

                {/* Copyright */}
                <p className="footer-copyright">
                    &copy; {new Date().getFullYear()} HabitFlow. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
