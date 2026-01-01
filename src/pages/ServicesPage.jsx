import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 'daily',
            title: 'Daily Habits',
            description: 'Build consistency with small daily actions.',
            icon: '☀️',
            color: '#FFD700'
        },
        {
            id: 'weekly',
            title: 'Weekly Goals',
            description: 'Track larger objectives week by week.',
            icon: '📅',
            color: '#646cff'
        },
        {
            id: 'wellness',
            title: 'Wellness Tracker',
            description: 'Monitor your health, sleep, and mood.',
            icon: '❤️',
            color: '#ff6b6b'
        },
        {
            id: 'productivity',
            title: 'Productivity',
            description: 'Focus on work deep dives and project milestones.',
            icon: '🚀',
            color: '#4ecdc4'
        }
    ];

    const handleServiceClick = (serviceId) => {
        // In a real app, you might pass the serviceId to the dashboard or filter data
        navigate('/dashboard');
    };

    return (
        <div className="services-page">
            <h1 className="services-title">Choose Your Tracking Journey</h1>
            <p className="services-subtitle">Select a category to get started.</p>

            <div className="services-grid">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card"
                        onClick={() => handleServiceClick(service.id)}
                    >
                        <div className="service-icon" style={{ borderColor: service.color }}>
                            {service.icon}
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="service-arrow">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
