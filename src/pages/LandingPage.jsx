
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Build Better Habits,<br />
                        <span className="highlight">One Day at a Time.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Track your progress, stay consistent, and achieve your goals with our beautiful and intuitive habit tracker.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-btn primary" onClick={() => navigate('/services')}>Start Tracking Free</button>
                        <button className="cta-btn secondary">Learn More</button>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* Placeholder for a cool visual or 3D element */}
                    <div className="visual-circle"></div>
                    <div className="visual-card">
                        <span>Running</span>
                        <div className="progress-bar"><div className="fill" style={{ width: '75%' }}></div></div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <div className="icon">📊</div>
                    <h3>Visualize Progress</h3>
                    <p>See your streaks and consistency with beautiful charts.</p>
                </div>
                <div className="feature-card">
                    <div className="icon">🔔</div>
                    <h3>Smart Reminders</h3>
                    <p>Get notified at the right time to keep your streak alive.</p>
                </div>
                <div className="feature-card">
                    <div className="icon">🎯</div>
                    <h3>Set Goals</h3>
                    <p>Define clear objectives and track your journey towards them.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
