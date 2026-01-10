import { fetchWithTimeout, getAuthHeaders } from './apiUtils';

export const habitService = {
    // Get all habits
    getAllHabits: async () => {
        const response = await fetchWithTimeout('/habits', {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch habits');
        return response.json();
    },

    // Create a new habit
    createHabit: async (habitData) => {
        const response = await fetchWithTimeout('/habits', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(habitData),
        });
        if (!response.ok) throw new Error('Failed to create habit');
        return response.json();
    },

    // Toggle completion for a specific date
    toggleHabitDate: async (id, date) => {
        const response = await fetchWithTimeout(`/habits/${id}/toggle-date`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ date }),
        });
        if (!response.ok) throw new Error('Failed to update habit');
        return response.json();
    },

    // Update habit details
    updateHabit: async (id, updates) => {
        const response = await fetchWithTimeout(`/habits/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update habit');
        return response.json();
    },

    // Delete a habit
    deleteHabit: async (id) => {
        const response = await fetchWithTimeout(`/habits/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete habit');
        if (response.status === 204) return { success: true };
        return response.json();
    }
};
