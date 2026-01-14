import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [initiallyLogin, setInitiallyLogin] = useState(false);

    const openAuthModal = (loginMode = false) => {
        setInitiallyLogin(loginMode);
        setIsAuthModalOpen(true);
    };

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
