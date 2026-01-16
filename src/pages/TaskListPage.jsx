import React, { useEffect, useState } from 'react';
import TaskStats from '../components/TaskStats';
import TaskTable from '../components/TaskTable';
import { taskService } from '../api/taskService';
import './TaskListPage.css';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskAdded = async (e) => {
        e.preventDefault();
        console.log("Attempting to add task:", newTaskTitle);
        if (!newTaskTitle.trim()) {
            console.warn("Task title is empty");
            return;
        }

        try {
            console.log("Sending request to create task...");
            const newTask = await taskService.createTask({
                title: newTaskTitle,
                dueDate: new Date(), // Default to today
                priority: 'Medium',
                status: 'Not Started',
                category: 'Work'
            });
            console.log("Task created successfully:", newTask);
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
        } catch (error) {
            console.error("Failed to add task:", error);
            alert("Failed to add task: " + error.message);
        }
    };

    const handleTaskUpdated = (updated) => {
        setTasks(tasks.map(t => t._id === updated._id ? updated : t));
    };

    const handleTaskDeleted = (id) => {
        setTasks(tasks.filter(t => t._id !== id));
    };

    return (
        <div className="task-list-page">
            <div className="task-dashboard">
                {/* 1. Stats Header */}
                <TaskStats tasks={tasks} />

                {/* 2. Task Table */}
                <div className="task-table-wrapper">
                    {loading ? <div className="loading">Loading tasks...</div> : (
                        <TaskTable
                            tasks={tasks}
                            onTaskUpdated={handleTaskUpdated}
                            onTaskDeleted={handleTaskDeleted}
                        />
                    )}
                </div>

                {/* 3. Quick Add Footer */}
                <div className="quick-add-bar">
                    <form onSubmit={handleTaskAdded} style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="+ Add a new task..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="quick-add-input"
                        />
                        <button type="submit" className="quick-add-btn">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskListPage;
