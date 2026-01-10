import { fetchWithTimeout, getAuthHeaders } from './apiUtils';

export const taskService = {
    // Get all tasks
    getAllTasks: async () => {
        const response = await fetchWithTimeout('/tasks', {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    // Create a new task
    createTask: async (taskData) => {
        const response = await fetchWithTimeout('/tasks', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    // Update a task
    updateTask: async (id, updates) => {
        const response = await fetchWithTimeout(`/tasks/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    // Delete a task
    deleteTask: async (id) => {
        const response = await fetchWithTimeout(`/tasks/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders() // Added Auth Headers
        });
        if (!response.ok) throw new Error('Failed to delete task');
        return response.json();
    }
};
