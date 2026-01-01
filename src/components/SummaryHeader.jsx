import React from 'react';
import './SummaryHeader.css';

const SummaryHeader = ({ habits, currentMonth }) => {
    const totalHabits = habits.length;

    // Calculate total completions for the current month
    let totalCompletions = 0;
    habits.forEach(habit => {
        const monthCompletions = habit.completedDates.filter(date => {
            const d = new Date(date);
            return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
        }).length;
        totalCompletions += monthCompletions;
    });

    // Calculate total possible completions (Habits * Days in month roughly, or current day)
    // For simplicity, let's use the sum of goals for now
    const totalGoal = habits.reduce((acc, curr) => acc + (curr.goal || 30), 0);
    const progressPercentage = totalGoal > 0 ? Math.round((totalCompletions / totalGoal) * 100) : 0;

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    return (
        <div className="summary-header">
            <h2 className="month-title">{monthName}</h2>

            <div className="stat-box">
                <span className="stat-label">Number of habits</span>
                <span className="stat-value">{totalHabits}</span>
            </div>

            <div className="stat-box">
                <span className="stat-label">Completed habits</span>
                <span className="stat-value">{totalCompletions}</span>
            </div>

            <div className="stat-box progress-box">
                <span className="stat-label">Progress</span>
                <div className="header-progress-bar">
                    <div className="header-progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="stat-box">
                <span className="stat-label">Progress in %</span>
                <span className="stat-value">{progressPercentage}%</span>
            </div>
        </div>
    );
};

export default SummaryHeader;
