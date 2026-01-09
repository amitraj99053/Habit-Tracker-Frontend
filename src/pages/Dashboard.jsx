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
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = currentMonth.toLocaleString('default', { month: 'long' });

        // Generate headers: Name, Category, Month, 1, 2, ..., 31, Total
        const dayHeaders = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const headers = ["Habit Name", "Category", "Month", ...dayHeaders, "Total Completed"];

        const rows = habits.map(h => {
            const rowData = [
                `"${h.name}"`,
                h.category,
                `${monthName} ${year}`
            ];

            // Check completion for each day of the month
            let monthlyTotal = 0;
            for (let day = 1; day <= daysInMonth; day++) {
                // Construct date string YYYY-MM-DD to match backend format
                // Note: Month is 0-indexed in JS, but we need 1-indexed for string, adding '0' padding
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                // Check if this date exists in completedDates array
                // Backend usually stores ISO strings or YYYY-MM-DD. 
                // Assuming completedDates contains full ISO strings or compatible formats.
                // We'll parse the completedDates to ensure match.
                const isCompleted = h.completedDates.some(d => {
                    const completedDate = new Date(d);
                    return completedDate.getFullYear() === year &&
                        completedDate.getMonth() === month &&
                        completedDate.getDate() === day;
                });

                if (isCompleted) monthlyTotal++;
                rowData.push(isCompleted ? "Completed" : "-");
            }

            rowData.push(monthlyTotal);
            return rowData;
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `Habit_Tracker_${monthName}_${year}.csv`);
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
                    {error && (
                        <div className="error-message" style={{ color: 'red', padding: '1rem', background: '#fee2e2', marginBottom: '1rem', borderRadius: '8px' }}>
                            Error loading habits: {error}. Is the backend running?
                        </div>
                    )}
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
