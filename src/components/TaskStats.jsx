import React from 'react';
import './TaskStats.css';

const TaskStats = ({ tasks }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalTasks = tasks.length;

    const tasksToday = tasks.filter(task => {
        if (!task.dueDate) return false;
        const d = new Date(task.dueDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
    }).length;

    const overdue = tasks.filter(task => {
        if (!task.dueDate || task.status === 'Done') return false;
        const d = new Date(task.dueDate);
        d.setHours(0, 0, 0, 0);
        return d < today;
    }).length;

    const completed = tasks.filter(t => t.status === 'Done').length;
    const progress = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

    return (
        <div className="task-stats-container">
            <div className="task-stats-header">
                <div className="title-section">
                    <h1 className="page-title">Task Master</h1>
                    <div className="date-display">
                        <span className="label">Today's Date</span>
                        <span className="value">{today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                <div className="stats-group">
                    <div className="stat-item green">
                        <span className="label">Tasks Today</span>
                        <span className="value-box">{tasksToday}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Total Pending</span>
                        <span className="value-box simple">{totalTasks - completed}</span>
                    </div>
                    <div className="stat-item red">
                        <span className="label">Overdue</span>
                        <span className="value-box">{overdue}</span>
                    </div>
                </div>
            </div>

            <div className="bg-glass p-6 rounded-2xl border border-white/10">
                <div className="progress-header">
                    <span className="progress-label">Completion Status</span>
                    <span className="progress-text">{progress}%</span>
                </div>
                <div className="task-progress-bar">
                    <div className="task-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default TaskStats;
