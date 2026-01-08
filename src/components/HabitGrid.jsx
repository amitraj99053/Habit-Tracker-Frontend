import React, { useMemo } from 'react';
import { habitService } from '../api/habitService';
import './HabitGrid.css';

const HabitGrid = ({ habits, currentMonth, onHabitUpdated, onHabitAdded }) => {
    const [editingId, setEditingId] = React.useState(null);
    const [tempName, setTempName] = React.useState('');

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentMonth);

    // Group days into weeks
    const weeks = useMemo(() => {
        const weeksArray = [];
        let currentWeek = [];

        for (let i = 1; i <= daysInMonth; i++) {
            currentWeek.push(i);
            if (currentWeek.length === 7 || i === daysInMonth) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }
        }
        return weeksArray;
    }, [daysInMonth]);

    const isCompletedOnDate = (habit, day) => {
        const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        targetDate.setHours(0, 0, 0, 0);

        return habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === targetDate.getTime();
        });
    };

    const toggleDate = async (habit, day) => {
        const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        try {
            const updatedHabit = await habitService.toggleHabitDate(habit._id, targetDate);
            onHabitUpdated(updatedHabit);
        } catch (error) {
            console.error('Error toggling date:', error);
        }
    };

    // Inline Edit Logic
    const startEditing = (habit) => {
        setEditingId(habit._id);
        setTempName(habit.name);
    };

    const saveEdit = async (habit) => {
        if (tempName.trim() === '' || tempName === habit.name) {
            setEditingId(null);
            return;
        }
        try {
            const updated = await habitService.updateHabit(habit._id, { name: tempName });
            onHabitUpdated(updated);
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update name", err);
        }
    };

    const handleKeyDown = (e, habit) => {
        if (e.key === 'Enter') {
            saveEdit(habit);
        } else if (e.key === 'Escape') {
            setEditingId(null);
            setTempName(habit.name);
        }
    };

    // Add Button Logic
    const handleAddClick = async () => {
        try {
            // Default new habit config
            const newHabit = {
                name: "New Habit",
                frequency: 'daily',
                goal: 30,
                icon: '📌',
                color: '#D7FF00',
                category: 'general'
            };
            const created = await habitService.createHabit(newHabit);
            onHabitAdded(created);
            // Auto-start editing the new habit
            startEditing(created);
        } catch (err) {
            console.error("Failed to create habit", err);
        }
    };

    return (
        <div className="habit-grid-container">
            <table className="habit-grid">
                <thead>
                    {/* Week Header Row */}
                    <tr>
                        <th className="habit-col-header" rowSpan="2">My Habits</th>
                        {weeks.map((week, index) => (
                            <th key={index} colSpan={week.length} className="week-header">
                                Week {index + 1}
                            </th>
                        ))}
                    </tr>
                    {/* Day Number Row */}
                    <tr>
                        {weeks.flat().map(day => (
                            <th key={day} className="day-header">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit._id}>
                            <td className="habit-name-cell">
                                <div className="habit-info">
                                    <div className="habit-icon">{habit.icon}</div>

                                    {editingId === habit._id ? (
                                        <input
                                            autoFocus
                                            className="inline-edit-input"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            onBlur={() => saveEdit(habit)}
                                            onKeyDown={(e) => handleKeyDown(e, habit)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    ) : (
                                        <span
                                            className="habit-name editable"
                                            onClick={() => startEditing(habit)}
                                            title="Click to rename"
                                        >
                                            {habit.name}
                                        </span>
                                    )}
                                </div>
                            </td>
                            {weeks.flat().map(day => {
                                const completed = isCompletedOnDate(habit, day);
                                return (
                                    <td key={day} className="checkbox-cell" onClick={() => toggleDate(habit, day)}>
                                        <div
                                            className={`grid-checkbox ${completed ? 'checked' : ''}`}
                                            style={completed ? { backgroundColor: habit.color || '#D7FF00', color: '#111' } : {}}
                                        >
                                            {completed && '✓'}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}

                    {/* Add Button Row */}
                    <tr className="quick-add-row">
                        <td className="habit-name-cell quick-add-cell" onClick={handleAddClick} style={{ cursor: 'pointer' }}>
                            <div className="habit-info add-btn-content">
                                <div className="habit-icon add-icon">+</div>
                                <span className="add-text">Add New Habit</span>
                            </div>
                        </td>
                        {/* Empty cells for the rest of the row */}
                        <td colSpan={daysInMonth} className="empty-row-space" onClick={handleAddClick} style={{ cursor: 'pointer' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HabitGrid;
