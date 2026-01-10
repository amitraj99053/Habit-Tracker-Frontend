const API_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'x-auth-token': token || ''
    };
};

export const habitService = {
    // Get all habits
    getAllHabits: async () => {
        const response = await fetch(`${API_URL}/habits`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch habits');
        return response.json();
    },

    // Create a new habit
    createHabit: async (habitData) => {
        const response = await fetch(`${API_URL}/habits`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(habitData),
        });
        if (!response.ok) throw new Error('Failed to create habit');
        return response.json();
    },

    // Toggle completion for a specific date
    toggleHabitDate: async (id, date) => {
        const response = await fetch(`${API_URL}/habits/${id}/toggle-date`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ date }),
        });
        if (!response.ok) throw new Error('Failed to update habit');
        return response.json();
    },

    // Update habit details
    updateHabit: async (id, updates) => {
        const response = await fetch(`${API_URL}/habits/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update habit');
        return response.json();
    },

    // Delete a habit
    deleteHabit: async (id) => {
        const response = await fetch(`${API_URL}/habits/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete habit');
        // Handle 204 No Content if applicable, though backend returns message
        if (response.status === 204) return { success: true };
        return response.json();
    }
};
