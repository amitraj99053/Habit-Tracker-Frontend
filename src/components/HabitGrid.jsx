import React, { useMemo } from 'react';
import { habitService } from '../api/habitService';

import { Trash2 } from 'lucide-react';
import './HabitGrid.css';

const HabitGrid = ({ habits, currentMonth, onHabitUpdated, onHabitAdded, onHabitDeleted }) => {
    const [editingId, setEditingId] = React.useState(null);
    const [tempName, setTempName] = React.useState('');
    const [pickerOpen, setPickerOpen] = React.useState(null); // stores habit ID
    const [pickerCoords, setPickerCoords] = React.useState({ top: 0, left: 0 });

    // Emoji List for Picker
    const EMOJI_LIST = [
        '📌', '💪', '📚', '🧘', '💧', '🚶', '🤸', '🥗', '🍎', '💤',
        '💻', '📝', '🎨', '🎵', '🎸', '🌱', '☀️', '❤️', '💼', '💰',
        '🧹', '🧴', '💊', '🚭', '📵', '🕰️', '📅', '✅', '🏆', '⭐'
    ];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentMonth);

    // Group days into weeks
    const weeks = useMemo(() => {
        const weeksArray = [];
        let currentWeek = [];

        for (let i = 1; i <= daysInMonth; i++) {
            currentWeek.push(i);
            if (currentWeek.length === 7 || i === daysInMonth) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }
        }
        return weeksArray;
    }, [daysInMonth]);

    const isCompletedOnDate = (habit, day) => {
        const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        targetDate.setHours(0, 0, 0, 0);

        return habit.completedDates.some(date => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === targetDate.getTime();
        });
    };

    const toggleDate = async (habit, day) => {
        const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        try {
            const updatedHabit = await habitService.toggleHabitDate(habit._id, targetDate);
            onHabitUpdated(updatedHabit);
        } catch (error) {
            console.error('Error toggling date:', error);
            alert("Failed to toggle date: " + error.message);
        }
    };

    // Inline Edit Logic
    const startEditing = (habit) => {
        setEditingId(habit._id);
        setTempName(habit.name);
    };

    const saveEdit = async (habit) => {
        if (tempName.trim() === '' || tempName === habit.name) {
            setEditingId(null);
            return;
        }
        try {
            const updated = await habitService.updateHabit(habit._id, { name: tempName });
            onHabitUpdated(updated);
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update name", err);
            alert("Failed to update name: " + err.message);
        }
    };

    const handleKeyDown = (e, habit) => {
        if (e.key === 'Enter') {
            saveEdit(habit);
        } else if (e.key === 'Escape') {
            setEditingId(null);
            setTempName(habit.name);
        }
    };

    // Icon Picker Logic
    const togglePicker = (habitId, e) => {
        e.stopPropagation();
        if (pickerOpen === habitId) {
            setPickerOpen(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setPickerCoords({
                top: rect.top + (rect.height / 2),
                left: rect.right + 10
            });
            setPickerOpen(habitId);
        }
    };

    const selectIcon = async (habit, newIcon) => {
        try {
            const updated = await habitService.updateHabit(habit._id, { icon: newIcon });
            onHabitUpdated(updated);
            setPickerOpen(null);
        } catch (err) {
            console.error("Failed to update icon", err);
            alert("Failed to update icon: " + err.message);
        }
    };

    // Close picker when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setPickerOpen(null);
        if (pickerOpen) {
            window.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', handleClickOutside, true);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleClickOutside, true);
        };
    }, [pickerOpen]);

    // Delete Habit Logic
    const handleDelete = async (e, habit) => {
        console.log("Delete clicked for:", habit);
        e.stopPropagation(); // Prevent drag/other clicks
        if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
            try {
                console.log("Sending delete request for:", habit._id);
                await habitService.deleteHabit(habit._id);
                console.log("Delete success, updating UI");
                onHabitDeleted(habit._id);
            } catch (err) {
                console.error("Failed to delete habit", err);
                alert("Failed to delete habit: " + err.message);
            }
        }
    };

    // Add Button Logic
    const handleAddClick = async () => {
        try {
            // Default new habit config
            const newHabit = {
                name: "New Habit",
                frequency: 'daily',
                goal: 30,
                icon: '📌',
                color: '#D7FF00',
                category: 'general'
            };
            const created = await habitService.createHabit(newHabit);
            onHabitAdded(created);
            startEditing(created);
        } catch (err) {
            console.error("Failed to create habit", err);
            alert("Failed to create habit: " + err.message);
        }
    };



    return (
        <div className="habit-grid-container">
            <table className="habit-grid">
                <thead>
                    <tr>
                        <th className="habit-col-header" rowSpan="2">My Habits</th>
                        {weeks.map((week, index) => (
                            <th key={index} colSpan={week.length} className="week-header">
                                Week {index + 1}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {weeks.flat().map(day => (
                            <th key={day} className="day-header">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit._id}>
                            <td className="habit-name-cell">
                                <div className="habit-info">
                                    <div className="habit-icon-wrapper">
                                        <div
                                            className="habit-icon clickable-icon"
                                            onClick={(e) => togglePicker(habit._id, e)}
                                            title="Change icon"
                                        >
                                            {habit.icon}
                                        </div>
                                    </div>

                                    {editingId === habit._id ? (
                                        <input
                                            autoFocus
                                            className="inline-edit-input"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            onBlur={() => saveEdit(habit)}
                                            onKeyDown={(e) => handleKeyDown(e, habit)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    ) : (
                                        <>
                                            <span
                                                className="habit-name editable"
                                                onClick={() => startEditing(habit)}
                                                title="Click to rename"
                                            >
                                                {habit.name}
                                            </span>
                                            {/* Delete Button - Visible on Hover */}
                                            <button
                                                className="delete-habit-btn"
                                                onClick={(e) => handleDelete(e, habit)}
                                                title="Delete habit"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                            {weeks.flat().map(day => {
                                const completed = isCompletedOnDate(habit, day);
                                return (
                                    <td key={day} className="checkbox-cell" onClick={() => toggleDate(habit, day)}>
                                        <div
                                            className={`grid-checkbox ${completed ? 'checked' : ''}`}
                                            style={completed ? { backgroundColor: habit.color || '#D7FF00', color: '#111' } : {}}
                                        >
                                            {completed && '✓'}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}

                    {pickerOpen && (
                        <div
                            className="icon-picker-popover"
                            style={{
                                position: 'fixed',
                                top: pickerCoords.top,
                                left: pickerCoords.left,
                                transform: 'translateY(-50%)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="picker-grid">
                                {EMOJI_LIST.map(emoji => (
                                    <div
                                        key={emoji}
                                        className="emoji-option"
                                        onClick={() => selectIcon(habits.find(h => h._id === pickerOpen), emoji)}
                                    >
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <tr className="quick-add-row">
                        <td className="habit-name-cell quick-add-cell" onClick={handleAddClick} style={{ cursor: 'pointer' }}>
                            <div className="habit-info add-btn-content">
                                <div className="habit-icon add-icon">+</div>
                                <span className="add-text">Add New Habit</span>
                            </div>
                        </td>
                        <td colSpan={daysInMonth} className="empty-row-space" onClick={handleAddClick} style={{ cursor: 'pointer' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HabitGrid;
