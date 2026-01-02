import React, { useMemo } from 'react';
import { habitService } from '../api/habitService';
import './HabitGrid.css';

const HabitGrid = ({ habits, currentMonth, onHabitUpdated, onEdit }) => {
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
                            <td
                                className="habit-name-cell"
                                onClick={() => onEdit(habit)}
                                title="Click to edit habit"
                            >
                                <div className="habit-info">
                                    <div className="habit-icon">{habit.icon}</div>
                                    <span className="habit-name">{habit.name}</span>
                                    {/* Visual hint for editing */}
                                    <span className="edit-hint">✎</span>
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
                </tbody>
            </table>
        </div>
    );
};

export default HabitGrid;
