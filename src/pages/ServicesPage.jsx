import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ServicesPage.css';

const ServicesPage = ({ openAuthModal }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

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
            // Check auth before navigating to dashboard
            if (!user) {
                // Determine if we should show login or signup. Usually "Start Tracking" -> Signup?
                // Or maybe login. The user said dashboard is not opening.
                // Let's default to Login for existing users or Signup if new. 
                // Let's pass true/false based on what we think is best. 
                // Previous Header usage was openModal(true) which was Register? Wait.
                // In Header: openModal(true) was Register? No, let's check Header.
                // Header said "Register" button clicks openModal(true).
                // SignUpModal: initializedLogin = true -> Login Mode. 
                // Wait, Header line 111: onClick={() => openModal(true)}>Register</button>
                // So true meant Login? Let's check SignUpModal again.
                // SignUpModal line 6: initiallyLogin = false. const [isLogin, setIsLogin] = useState(initiallyLogin).
                // So passing true means isLogin is true. 
                // So the "Register" button in Header was actually opening the LOGIN form? That seems wrong.
                // Let's double check Header line 111.
                // Ah, I might have misread logic. 
                // If I click Register, I want Signup form. So initiallyLogin SHOULD be false.
                // But Header was passing true? 
                // Let's re-read Header snippet source: `onClick={() => openModal(true)}>Register`
                // And `const openModal = (isLogin) => { setInitiallyLogin(isLogin); ... }`
                // And `SignUpModal({ ... initiallyLogin })`.
                // If Header calls openModal(true), then initiallyLogin=true, so SignUpModal starts in Login mode.
                // This seems like a bug in the previous code: "Register" button opening "Login" modal.
                // Or maybe I am misinterpreting. 
                // Anyway, for "Start Tracking", if user is not logged in, they probably want to Sign Up (create account) or Login.
                // Let's open the modal in Signup mode (false) so they can create account to start tracking.
                openAuthModal(false);
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
