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
                <div className="date-display">
                    <span className="label">Date</span>
                    <span className="value">{today.toLocaleDateString()}</span>
                </div>
                <h1 className="page-title">TASK LIST</h1>
                <div className="stats-group">
                    <div className="stat-item green">
                        <span className="label">Today</span>
                        <span className="value-box">{tasksToday}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Total Tasks</span>
                        <span className="value-box simple">{totalTasks}</span>
                    </div>
                    <div className="stat-item red">
                        <span className="label">Overdue</span>
                        <span className="value-box">{overdue}</span>
                    </div>
                </div>
            </div>

            <div className="task-progress-bar-container">
                <span className="progress-text">{progress}%</span>
                <div className="task-progress-bar">
                    <div className="task-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default TaskStats;
