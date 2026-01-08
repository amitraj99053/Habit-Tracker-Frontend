import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// HabitForm removed
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
    const [editingHabit, setEditingHabit] = useState(null);

    const location = useLocation();
    const [journey, setJourney] = useState(location.state?.journey || 'all');

    useEffect(() => {
        if (location.state?.journey) {
            setJourney(location.state.journey);
        }
    }, [location.state]);

    useEffect(() => {
        loadHabits();
    }, [journey]); // Reload or Re-filter when journey changes

    const loadHabits = async () => {
        try {
            const data = await habitService.getAllHabits();
            // Filter locally for now (could move to backend)
            let filtered = data;
            if (journey === 'daily') {
                // specific logic for 'daily' journey? for now just show all or filter by frequency
                // filtered = data.filter(h => h.frequency === 'daily'); 
                // actually standard dashboard usually shows daily habits. 
            } else if (journey !== 'all' && journey !== 'daily') {
                // weekly, wellness, productivity
                filtered = data.filter(h => h.category === journey || h.frequency === journey); // broad match
            }
            // For 'daily', we might want to also include 'general' category
            if (journey === 'daily') {
                filtered = data.filter(h => h.frequency === 'daily' || h.category === 'general');
            }

            setHabits(filtered);
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
        setEditingHabit(null); // Close edit form if open
    };

    const handleHabitDeleted = (deletedId) => {
        setHabits(habits.filter(h => h._id !== deletedId));
    };

    const nextMonth = () => {
        setCurrentMonth(prev => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() + 1);
            return next;
        });
    };

    const prevMonth = () => {
        setCurrentMonth(prev => {
            const previous = new Date(prev);
            previous.setMonth(previous.getMonth() - 1);
            return previous;
        });
    };

    const handleExport = () => {
        const headers = ["Habit Name", "Category", "Frequency", "Goal", "Total Completed", "Completed Dates"];
        const rows = habits.map(h => [
            `"${h.name}"`, // Quote strings to handle commas
            h.category,
            h.frequency,
            h.goal,
            h.completedDates.length,
            `"${h.completedDates.join(', ')}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "habits_export.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="dashboard-container">
            {/* 1. Summary Header */}
            <SummaryHeader
                habits={habits}
                currentMonth={currentMonth}
                onNextMonth={nextMonth}
                onPrevMonth={prevMonth}
                onExport={handleExport}
            />

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
                            onHabitAdded={handleHabitAdded}
                            onHabitDeleted={handleHabitDeleted}
                        />
                    )}

                    {/* Form removed for inline editing professional look */}
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
