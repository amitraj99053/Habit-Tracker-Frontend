import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you. Check out our socials or send a message!</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <span className="info-icon">📧</span>
                            <h3>Email Us</h3>
                            <p>support@habitflow.com</p>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">📍</span>
                            <h3>Visit Us</h3>
                            <p>123 Productivity Lane<br />Silicon Valley, CA</p>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">🤝</span>
                            <h3>Connect</h3>
                            <div className="social-links">
                                <span>Twitter</span>
                                <span>LinkedIn</span>
                                <span>Instagram</span>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <h3>Send a Message</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="How can we help?" rows="4"></textarea>
                        </div>
                        <button type="submit" className="submit-btn" onClick={() => alert("Message sent! (Demo)")}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
