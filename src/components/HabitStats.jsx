import React from 'react';
import './HabitStats.css';

const HabitStats = ({ habits, currentMonth }) => {
    const calculateStats = (habit) => {
        const goal = habit.goal || 30;
        const actual = habit.completedDates.filter(date => {
            const d = new Date(date);
            return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
        }).length;

        // Cap progress at 100% for visual purposes
        const progressPercent = Math.min((actual / goal) * 100, 100);

        return { goal, actual, progressPercent };
    };

    return (
        <div className="habit-stats-container">
            <h3>Analysis</h3>
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Goal</th>
                        <th>Actual</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => {
                        const { goal, actual, progressPercent } = calculateStats(habit);
                        return (
                            <tr key={habit._id}>
                                <td>{goal}</td>
                                <td>{actual}</td>
                                <td className="progress-cell">
                                    <div className="stats-progress-bar">
                                        <div
                                            className="stats-progress-fill"
                                            style={{
                                                width: `${progressPercent}%`,
                                                backgroundColor: habit.color || '#646cff'
                                            }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HabitStats;
