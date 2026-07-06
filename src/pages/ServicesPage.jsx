import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ServicesPage.css';

import { Sun, Target, Heart, Zap, ListTodo } from 'lucide-react';

const ServicesPage = ({ openAuthModal }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const services = [
        {
            id: 'daily',
            title: 'Daily Habits',
            description: 'The foundation of success. Build consistency with small daily actions that compound over time.',
            Icon: Sun,
            color: '#FFD700',
            tags: ['Consistency', 'Routine', 'Growth'],
            previewBg: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, rgba(20, 20, 25, 0.4) 100%)'
        },
        {
            id: 'weekly',
            title: 'Weekly Goals',
            description: 'Zoom out and track larger objectives. Perfect for reviews, meal prep, and skill building.',
            Icon: Target,
            color: '#646cff',
            tags: ['Planning', 'Overview', 'Strategy'],
            previewBg: 'radial-gradient(circle at center, rgba(100, 108, 255, 0.15) 0%, rgba(20, 20, 25, 0.4) 100%)'
        },
        {
            id: 'wellness',
            title: 'Wellness Tracker',
            description: 'Prioritize your health. Monitor sleep, mood, water intake, and mindfulness practices.',
            Icon: Heart,
            color: '#ff6b6b',
            tags: ['Health', 'Mindfulness', 'Self-care'],
            previewBg: 'radial-gradient(circle at center, rgba(255, 107, 107, 0.15) 0%, rgba(20, 20, 25, 0.4) 100%)'
        },
        {
            id: 'productivity',
            title: 'Productivity',
            description: 'Deep work and project tracking. Measure focus time and hit your professional milestones.',
            Icon: Zap,
            color: '#4ecdc4',
            tags: ['Work', 'Focus', 'Projects'],
            previewBg: 'radial-gradient(circle at center, rgba(78, 205, 196, 0.15) 0%, rgba(20, 20, 25, 0.4) 100%)'
        },
        {
            id: 'task-list',
            title: 'Task Master',
            description: 'A powerful todo list to manage duties, deadlines, and priorities alongside your habits.',
            Icon: ListTodo,
            color: '#90ee90',
            tags: ['To-Do', 'Deadlines', 'Organization'],
            previewBg: 'radial-gradient(circle at center, rgba(144, 238, 144, 0.15) 0%, rgba(20, 20, 25, 0.4) 100%)'
        }
    ];

    const handleServiceClick = (serviceId) => {
        if (serviceId === 'task-list') {
            navigate('/tasks');
        } else {
            // Check auth before navigating to dashboard
            if (!user) {
                openAuthModal(false, { path: '/dashboard', state: { journey: serviceId } });
            } else {
                navigate('/dashboard', { state: { journey: serviceId } });
            }
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
                        style={{ '--card-accent': service.color }}
                        onClick={() => handleServiceClick(service.id)}
                    >
                        <div className="card-preview" style={{ background: service.previewBg }}>
                            {/* Creative Icon Representation with Glow */}
                            <div className="icon-glow-container" style={{ filter: `drop-shadow(0 0 25px ${service.color}33)` }}>
                                <service.Icon size={64} color={service.color} strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="service-content">
                            <div className="service-icon">
                                <service.Icon size={32} color={service.color} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-tags">
                                {service.tags.map(tag => (
                                    <span key={tag} className="tag" style={{ color: service.color, borderColor: `${service.color}22`, background: `${service.color}0a` }}>{tag}</span>
                                ))}
                            </div>
                            <button
                                className="select-btn"
                                style={{ '--hover-bg': service.color }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleServiceClick(service.id);
                                }}
                            >
                                Start Tracking
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
