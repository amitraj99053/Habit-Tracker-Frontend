import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-label">🚀 #1 Habit Tracking Tool</span>
                    <h1 className="hero-title">
                        Crush Goals with <br />
                        <span className="highlight">Focus & Clarity.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Stop dreaming and start doing. The ultimate tracking system designed to build consistency and accelerate your growth.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-btn primary" onClick={() => navigate('/services')}>Choose Tracker</button>
                        <button className="cta-btn secondary">View Demo</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card">
                        <h3>Daily Overview</h3>
                        <div className="mock-stat">
                            <div className="stat-icon">🔥</div>
                            <div>
                                <strong>Current Streak</strong>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>12 Days Consistent</div>
                            </div>
                        </div>
                        <div className="mock-stat">
                            <div className="stat-icon">✅</div>
                            <div>
                                <strong>Tasks Completed</strong>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>8/10 Today</div>
                            </div>
                        </div>
                        <div className="mock-stat">
                            <div className="stat-icon">📈</div>
                            <div>
                                <strong>Productivity Score</strong>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>94% Efficiency</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stat-item">
                    <span className="stat-number">900+</span>
                    <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">30d</span>
                    <span className="stat-label">Avg. Streak</span>
                </div>
            </section>

            <section className="features">
                <div className="section-header">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <p>Features designed for peak performers.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Deep Analytics</h3>
                        <p>Visualize your progress with stunning charts and uncover hidden patterns in your behavior.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔔</div>
                        <h3>Smart Nudges</h3>
                        <p>Intelligent reminders that adapt to your schedule, ensuring you never miss a beat.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Goal Architecture</h3>
                        <p>Break down massive goals into manageable daily actions. The clarity you need to succeed.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
