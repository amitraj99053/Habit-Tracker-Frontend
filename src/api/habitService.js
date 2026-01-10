import { fetchWithTimeout, getAuthHeaders } from './apiUtils';

export const habitService = {
    // Get all habits
    getAllHabits: async () => {
        const response = await fetchWithTimeout('/habits', {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch habits (${response.status})`);
        }
        return response.json();
    },

    // Create a new habit
    createHabit: async (habitData) => {
        const response = await fetchWithTimeout('/habits', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(habitData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create habit (${response.status})`);
        }
        return response.json();
    },

    // Toggle completion for a specific date
    toggleHabitDate: async (id, date) => {
        const response = await fetchWithTimeout(`/habits/${id}/toggle-date`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ date }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update habit (${response.status})`);
        }
        return response.json();
    },

    // Update habit details
    updateHabit: async (id, updates) => {
        const response = await fetchWithTimeout(`/habits/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update habit (${response.status})`);
        }
        return response.json();
    },

    // Delete a habit
    deleteHabit: async (id) => {
        const response = await fetchWithTimeout(`/habits/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to delete habit (${response.status})`);
        }
        if (response.status === 204) return { success: true };
        return response.json();
    }
};
