import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import Dashboard from './pages/Dashboard';
import TaskListPage from './pages/TaskListPage';
import ContactPage from './pages/ContactPage';
import SignUpModal from './components/SignUpModal';
import './App.css'

import { AuthProvider } from './context/AuthContext';

function AppContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [initiallyLogin, setInitiallyLogin] = useState(false);
    const [pendingRedirect, setPendingRedirect] = useState(null);

    const openAuthModal = (loginMode = false, redirect = null) => {
        setInitiallyLogin(loginMode);
        if (redirect) setPendingRedirect(redirect);
        setIsAuthModalOpen(true);
    };

    // Execute pending redirect after successful login
    useEffect(() => {
        if (user) {
            if (pendingRedirect) {
                navigate(pendingRedirect.path, { state: pendingRedirect.state });
                setPendingRedirect(null);
            } else if (isAuthModalOpen) {
                // Default redirect to dashboard if no specific redirect is pending
                navigate('/dashboard');
            }
            // Allow the modal to close itself via its internal timeout to show success message
            // setIsAuthModalOpen(false); 
        }
    }, [user, pendingRedirect, navigate, isAuthModalOpen]);

    return (
        <div className="app-container">
            <Header openAuthModal={openAuthModal} />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/services" element={<ServicesPage openAuthModal={openAuthModal} />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<TaskListPage />} />
                </Routes>
            </main>
            {location.pathname === '/' && <Footer />}

            <SignUpModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initiallyLogin={initiallyLogin}
            />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    )
}

export default App
