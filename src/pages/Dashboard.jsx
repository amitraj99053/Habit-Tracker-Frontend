import React, { useEffect, useState } from 'react';
import HabitForm from '../components/HabitForm';
import SummaryHeader from '../components/SummaryHeader';
import HabitGrid from '../components/HabitGrid';
import HabitStats from '../components/HabitStats';
import { habitService } from '../api/habitService';
import './Dashboard.css';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

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

    return (
        <div className="dashboard-container">
            {/* 1. Summary Header */}
            <SummaryHeader habits={habits} currentMonth={currentMonth} />

            <div className="dashboard-main-content">
                <div className="left-panel">
                    {/* 2. Grid View */}
                    {loading ? (
                        <div className="loading">Loading tracking data...</div>
                    ) : (
                        <HabitGrid
                            habits={habits}
                            currentMonth={currentMonth}
                            onHabitUpdated={handleHabitUpdated}
                        />
                    )}

                    {/* Form could go below or in a modal. For now, keeping it here. */}
                    <div className="add-habit-section">
                        <h3>Add New Habit</h3>
                        <HabitForm onHabitAdded={handleHabitAdded} />
                    </div>
                </div>

                {/* 3. Analysis Panel */}
                <div className="right-panel">
                    <HabitStats habits={habits} currentMonth={currentMonth} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
