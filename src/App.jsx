import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import Dashboard from './pages/Dashboard';
import TaskListPage from './pages/TaskListPage';
import ContactPage from './pages/ContactPage';
import './App.css'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/tasks" element={<TaskListPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
