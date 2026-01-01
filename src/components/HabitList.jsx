import React from 'react';
import { habitService } from '../api/habitService';
import './HabitList.css';

const HabitList = ({ habits, onHabitUpdated, onHabitDeleted }) => {
    const isCompletedToday = (habit) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
        });
    };

    const handleComplete = async (habit) => {
        try {
            const updatedHabit = await habitService.completeHabit(habit._id);
            onHabitUpdated(updatedHabit);
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this habit?')) return;
        try {
            await habitService.deleteHabit(id);
            onHabitDeleted(id);
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    if (habits.length === 0) {
        return <div className="empty-state">No habits yet. Start by adding one above!</div>;
    }

    return (
        <div className="habit-list">
            {habits.map((habit) => {
                const completed = isCompletedToday(habit);
                return (
                    <div key={habit._id} className={`habit-item ${completed ? 'completed' : ''}`}>
                        <div className="habit-content">
                            <h3>{habit.name}</h3>
                            {habit.description && <p>{habit.description}</p>}
                            <div className="streak-info">
                                🔥 {habit.completedDates.length} days completed
                            </div>
                        </div>
                        <div className="habit-actions">
                            <button
                                className={`check-btn ${completed ? 'checked' : ''}`}
                                onClick={() => !completed && handleComplete(habit)}
                                disabled={completed}
                            >
                                {completed ? '✓ Done' : 'Complete'}
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(habit._id)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HabitList;
