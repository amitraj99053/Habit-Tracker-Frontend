const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const habitService = {
    // Get all habits
    getAllHabits: async () => {
        const response = await fetch(`${API_URL}/habits`);
        if (!response.ok) throw new Error('Failed to fetch habits');
        return response.json();
    },

    // Create a new habit
    createHabit: async (habitData) => {
        const response = await fetch(`${API_URL}/habits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(habitData),
        });
        if (!response.ok) throw new Error('Failed to create habit');
        return response.json();
    },

    // Toggle completion for a specific date
    toggleHabitDate: async (id, date) => {
        const response = await fetch(`${API_URL}/habits/${id}/toggle-date`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
        });
        if (!response.ok) throw new Error('Failed to update habit');
        return response.json();
    },

    // Delete a habit
    deleteHabit: async (id) => {
        const response = await fetch(`${API_URL}/habits/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete habit');
        return response.json();
    }
};
