import React, { useState } from 'react';
import { habitService } from '../api/habitService';
import './HabitForm.css';

const HabitForm = ({ onHabitAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(30);
    const [icon, setIcon] = useState('📝');
    const [color, setColor] = useState('#646cff');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        try {
            const newHabit = await habitService.createHabit({
                name,
                description,
                goal,
                icon,
                color
            });
            onHabitAdded(newHabit);
            // Reset form
            setName('');
            setDescription('');
            setGoal(30);
            setIcon('📝');
            setColor('#646cff');
        } catch (error) {
            console.error('Error creating habit:', error);
        }
    };

    const presetIcons = ['📝', '💧', '🏃', '🧘', '💰', '🥦', '📚', '💤'];
    const presetColors = ['#646cff', '#ff6b6b', '#4ecdc4', '#ffd700', '#90ee90', '#ff9f43'];

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
                <label>Habit Name</label>
                <input
                    type="text"
                    className="habit-input"
                    placeholder="e.g., Read 30 mins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Goal (Days/Month)</label>
                    <input
                        type="number"
                        className="habit-input"
                        value={goal}
                        onChange={(e) => setGoal(parseInt(e.target.value))}
                        min="1"
                        max="31"
                    />
                </div>

                <div className="form-group">
                    <label>Icon</label>
                    <div className="icon-picker">
                        {presetIcons.map(i => (
                            <button
                                type="button"
                                key={i}
                                className={`icon-btn ${icon === i ? 'selected' : ''}`}
                                onClick={() => setIcon(i)}
                            >
                                {i}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Color</label>
                    <div className="color-picker">
                        {presetColors.map(c => (
                            <button
                                type="button"
                                key={c}
                                className={`color-btn ${color === c ? 'selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button type="submit" className="add-btn full-width">Create Habit</button>
        </form>
    );
};

export default HabitForm;
