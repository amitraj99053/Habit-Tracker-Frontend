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
            <div className="header-top">
                <div className="month-nav-container">
                    <button className="nav-btn" onClick={onPrevMonth}><ChevronLeft size={18} /></button>
                    <h2 className="month-title">{monthName} {year}</h2>
                    <button className="nav-btn" onClick={onNextMonth}><ChevronRight size={18} /></button>
                </div>

                <button className="export-btn" onClick={onExport}>
                    <Download size={16} style={{ marginRight: '8px' }} />
                    Export CSV
                </button>
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

                <div className="stat-box">
                    <div className="progress-container" style={{ '--progress': `${progressPercentage}%` }}>
                        <div className="progress-inner">
                            {progressPercentage}%
                        </div>
                    </div>
                    <span className="stat-label" style={{ marginTop: '0.5rem' }}>Goal Progress</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryHeader;
