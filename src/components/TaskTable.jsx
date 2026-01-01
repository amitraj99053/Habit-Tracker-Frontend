import React, { useState } from 'react';
import { taskService } from '../api/taskService';
import './TaskTable.css';

const TaskTable = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    const [editingId, setEditingId] = useState(null);

    const handleStatusChange = async (task, newStatus) => {
        try {
            const updated = await taskService.updateTask(task._id, { status: newStatus });
            onTaskUpdated(updated);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePriorityChange = async (task, newPriority) => {
        try {
            const updated = await taskService.updateTask(task._id, { priority: newPriority });
            onTaskUpdated(updated);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            await taskService.deleteTask(id);
            onTaskDeleted(id);
        } catch (err) {
            console.error(err);
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'red';
            case 'Medium': return 'orange';
            case 'Low': return 'blue';
            default: return 'grey';
        }
    };

    const getPriorityDot = (p) => (
        <span className={`priority-dot ${getPriorityColor(p)}`}></span>
    );

    return (
        <div className="task-table-container">
            <table className="task-table">
                <thead>
                    <tr>
                        <th className="check-col"></th>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id} className={task.status === 'Done' ? 'task-done' : ''}>
                            <td className="check-col">
                                <input
                                    type="checkbox"
                                    checked={task.status === 'Done'}
                                    onChange={() => handleStatusChange(task, task.status === 'Done' ? 'Not Started' : 'Done')}
                                />
                            </td>
                            <td className="task-title">
                                {task.title}
                            </td>
                            <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                            <td>
                                <select
                                    value={task.priority}
                                    onChange={(e) => handlePriorityChange(task, e.target.value)}
                                    className="table-select"
                                >
                                    <option value="High">🔴 High</option>
                                    <option value="Medium">🟡 Medium</option>
                                    <option value="Low">🔵 Low</option>
                                    <option value="Optional">⚪ Optional</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task, e.target.value)}
                                    className={`status-badge ${task.status.replace(' ', '-').toLowerCase()}`}
                                >
                                    <option value="Not Started">⚠️ Not Started</option>
                                    <option value="In Progress">✏️ In Progress</option>
                                    <option value="Done">✅ Done</option>
                                </select>
                            </td>
                            <td>{task.category}</td>
                            <td>
                                <button className="icon-btn delete" onClick={() => handleDelete(task._id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    {/* Add Row Placeholder */}
                    <tr className="add-row-placeholder">
                        <td colSpan="7" style={{ textAlign: 'center', color: '#888', padding: '1rem' }}>
                            + Add New Task (Use the form below)
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
