import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 'daily',
            title: 'Daily Habits',
            description: 'The foundation of success. Build consistency with small daily actions that compound over time.',
            icon: '☀️',
            color: '#FFD700',
            tags: ['Consistency', 'Routine', 'Growth'],
            previewColor: '#FFF9C4'
        },
        {
            id: 'weekly',
            title: 'Weekly Goals',
            description: 'Zoom out and track larger objectives. Perfect for reviews, meal prep, and skill building.',
            icon: '📅',
            color: '#646cff',
            tags: ['Planning', 'Overview', 'Strategy'],
            previewColor: '#E8EAF6'
        },
        {
            id: 'wellness',
            title: 'Wellness Tracker',
            description: 'Prioritize your health. Monitor sleep, mood, water intake, and mindfulness practices.',
            icon: '❤️',
            color: '#ff6b6b',
            tags: ['Health', 'Mindfulness', 'Self-care'],
            previewColor: '#FFEBEE'
        },
        {
            id: 'productivity',
            title: 'Productivity',
            description: 'Deep work and project tracking. Measure focus time and hit your professional milestones.',
            icon: '🚀',
            color: '#4ecdc4',
            tags: ['Work', 'Focus', 'Projects'],
            previewColor: '#E0F2F1'
        },
        {
            id: 'task-list',
            title: 'Task Master',
            description: 'A powerful todo list to manage duties, deadlines, and priorities alongside your habits.',
            icon: '✅',
            color: '#90ee90',
            tags: ['To-Do', 'Deadlines', 'Organization'],
            previewColor: '#F1F8E9'
        }
    ];

    const handleServiceClick = (serviceId) => {
        if (serviceId === 'task-list') {
            navigate('/tasks');
        } else {
            navigate('/dashboard', { state: { journey: serviceId } });
        }
    };

    return (
        <div className="services-page">
            <h1 className="services-title">Choose Your Bundle</h1>
            <p className="services-subtitle">Select a tracking system tailored to your current goals.</p>

            <div className="services-grid">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card"
                        onClick={() => handleServiceClick(service.id)}
                    >
                        <div className="card-preview" style={{ backgroundColor: service.previewColor }}>
                            {/* Abstract visual representation of the tracker */}
                            <div style={{ fontSize: '4rem', opacity: 0.2 }}>{service.icon}</div>
                        </div>
                        <div className="service-content">
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-tags">
                                {service.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <button className="select-btn">Start Tracking</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
