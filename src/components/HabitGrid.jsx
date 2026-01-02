import React from 'react';
import { habitService } from '../api/habitService';
import './HabitGrid.css';

const HabitGrid = ({ habits, currentMonth, onHabitUpdated, onEdit }) => {
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
            // Updated directly to backend
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
                    <tr>
                        <th className="habit-col-header">Habits</th>
                        {daysArray.map(day => (
                            <th key={day} className="day-header">
                                <div className="day-number">{day}</div>
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
                                    <span className="habit-name">{habit.name}</span>
                                    <button className="edit-icon-btn" onClick={() => onEdit(habit)}>✎</button>
                                </div>
                            </td>
                            {daysArray.map(day => {
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
