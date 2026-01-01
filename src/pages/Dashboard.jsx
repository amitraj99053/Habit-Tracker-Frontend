import React, { useEffect, useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import { habitService } from '../api/habitService';
import './Dashboard.css';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            const data = await habitService.getAllHabits();
            setHabits(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleHabitAdded = (newHabit) => {
        setHabits([newHabit, ...habits]);
    };

    const handleHabitUpdated = (updatedHabit) => {
        setHabits(habits.map(h => h._id === updatedHabit._id ? updatedHabit : h));
    };

    const handleHabitDeleted = (id) => {
        setHabits(habits.filter(h => h._id !== id));
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Habits</h1>
                <p>Track your daily wins.</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <HabitForm onHabitAdded={handleHabitAdded} />

            {loading ? (
                <div className="loading">Loading habits...</div>
            ) : (
                <HabitList
                    habits={habits}
                    onHabitUpdated={handleHabitUpdated}
                    onHabitDeleted={handleHabitDeleted}
                />
            )}
        </div>
    );
};

export default Dashboard;
