import React, { useState } from 'react';
import { habitService } from '../api/habitService';
import './HabitForm.css';

const HabitForm = ({ onHabitAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        try {
            const newHabit = await habitService.createHabit({ name, description });
            onHabitAdded(newHabit);
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error creating habit:', error);
        }
    };

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="habit-input"
                placeholder="Enter a new habit (e.g., Read 30 mins)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                className="habit-input"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="add-btn">Add Habit</button>
        </form>
    );
};

export default HabitForm;
