import React from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import './SummaryHeader.css';

const SummaryHeader = ({ habits, currentMonth, onNextMonth, onPrevMonth, onExport }) => {
    const totalHabits = habits.length;

    // Calculate total updates/completions for the current month vs goal
    // Note: Use a simple completion rate for now
    let totalCompletions = 0;
    habits.forEach(habit => {
        const monthCompletions = habit.completedDates.filter(date => {
            const d = new Date(date);
            return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
        }).length;
        totalCompletions += monthCompletions;
    });

    // Approximate total goal
    const totalGoal = habits.reduce((acc, curr) => acc + (curr.goal || 30), 0);
    const progressPercentage = totalGoal > 0 ? Math.round((totalCompletions / totalGoal) * 100) : 0;

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
        <div className="summary-header">
            <div className="header-left">
                <div className="greeting">Your Dashboard</div>
                <div className="month-nav-container">
                    <button className="nav-btn" onClick={onPrevMonth}><ChevronLeft size={20} /></button>
                    <h2 className="month-title">{monthName} {year}</h2>
                    <button className="nav-btn" onClick={onNextMonth}><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className="header-stats">
                <div className="stat-box">
                    <span className="stat-label">Active Habits</span>
                    <span className="stat-value">{totalHabits}</span>
                </div>

                <div className="stat-box">
                    <span className="stat-label">Completions</span>
                    <span className="stat-value">{totalCompletions}</span>
                </div>

                <div className="stat-box" style={{ alignItems: 'center' }}>
                    <div className="progress-container" style={{ '--progress': `${progressPercentage}%` }}>
                        <div className="progress-inner">
                            {progressPercentage}%
                        </div>
                    </div>
                </div>
            </div>

            <button className="export-btn" onClick={onExport} title="Download Excel/CSV">
                <Download size={20} />
            </button>
        </div>
    );
};

export default SummaryHeader;
