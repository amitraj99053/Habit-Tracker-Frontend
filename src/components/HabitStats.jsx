import React, { useMemo } from 'react';
import './HabitStats.css';
import { Trophy, TrendingUp, Activity } from 'lucide-react';

const HabitStats = ({ habits, currentMonth }) => {

    const statsData = useMemo(() => {
        if (!habits.length) return { overallAvg: 0, topPerformers: [], allStats: [] };

        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

        // Calculate days passed in the selected month (for consistency calculation)
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
        const daysPassed = isCurrentMonth ? today.getDate() : daysInMonth;

        let totalProgress = 0;
        let topPerformers = []; // Initialize array
        let maxProgress = -1;

        const allStats = habits.map(habit => {
            // Intelligent Goal: 
            // 1. If frequency is 'daily', ALWAYS use the actual days in the month
            // 2. If goal is set to >= 28, also treat as daily (legacy check)
            let goal;
            if (habit.frequency === 'daily') {
                goal = daysInMonth;
            } else {
                goal = habit.goal || 30;
                if (goal >= 28) {
                    goal = daysInMonth;
                }
            }

            // Consistency Target:
            // For Daily habits in current month, target is 'daysPassed'.
            // For others, we pro-rate the goal? Or simply use goal?
            // To be safe and simple: If Daily, usage daysPassed. Else usage proportional?
            // Let's stick to Daily habits getting the "Current Day Calculation" treatment for color.
            let consistencyTarget = goal;
            if (habit.frequency === 'daily' || goal === daysInMonth) {
                consistencyTarget = daysPassed;
            } else {
                // Pro-rated goal for non-daily? (e.g. Goal 15/month. Day 15/30. Target 7.5)
                // consistencyTarget = (daysPassed / daysInMonth) * goal;
                // But simpler to just leave non-daily as is for now unless requested.
            }
            const actual = habit.completedDates.filter(date => {
                const d = new Date(date);
                return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            }).length;

            const progressPercent = Math.min((actual / goal) * 100, 100); // For Bar Width (Absolute)

            totalProgress += progressPercent;

            if (progressPercent > maxProgress) {
                maxProgress = progressPercent;
                topPerformers = [habit];
            } else if (progressPercent === maxProgress && maxProgress > 0) {
                topPerformers.push(habit);
            }

            return { ...habit, adjustedGoal: goal, actual, progressPercent };
        });

        const overallAvg = Math.round(totalProgress / habits.length);

        return { overallAvg, topPerformers, allStats };
    }, [habits, currentMonth]);

    const { overallAvg, topPerformers, allStats } = statsData;

    const getProgressColor = (percent) => {
        if (percent >= 80) return '#D7FF00'; // Neon Green
        if (percent >= 50) return '#fbbf24'; // Warning Yellow
        return '#ef4444'; // Danger Red
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="habit-stats-cont">
            <div className="stats-header">
                <h3>Performance Overview</h3>
                <span className="stats-subtitle">Analytics for {monthName}</span>
            </div>

            {/* Top Level Widgets */}
            <div className="stats-widgets">
                <div className="widget-card">
                    <div className="widget-icon primary">
                        <Activity size={20} />
                    </div>
                    <div>
                        <span className="widget-label">Goal Progress</span>
                        <div className="widget-value">{overallAvg}%</div>
                    </div>
                </div>

                <div className="widget-card">
                    <div className="widget-icon accent">
                        <Trophy size={20} color="#ffd700" />
                    </div>
                    <div>
                        <span className="widget-label">Top Performer{topPerformers.length > 1 ? 's' : ''}</span>
                        <div className="widget-value small">
                            {topPerformers.length > 0 ? topPerformers.map(h => h.name).join(', ') : '-'}
                        </div>
                    </div>
                </div>
            </div>

            {/* List of Performance Cards */}
            <div className="stats-list-label">Habit Breakdown</div>
            <div className="stats-list">
                {allStats.map(habit => (
                    <div key={habit._id} className="habit-stat-card">
                        <div className="stat-card-header">
                            <div className="stat-identity">
                                <span className="stat-icon">{habit.icon}</span>
                                <span className="stat-name">{habit.name}</span>
                            </div>
                            <span className="stat-percent" style={{ color: getProgressColor(habit.progressPercent) }}>
                                {Math.round(habit.progressPercent)}%
                            </span>
                        </div>

                        <div className="stat-details">
                            <span>{habit.actual} / {habit.adjustedGoal} days</span>
                        </div>

                        <div className="stat-progress-bg">
                            <div
                                className="stat-progress-fill"
                                style={{
                                    width: `${habit.progressPercent}%`,
                                    backgroundColor: getProgressColor(habit.progressPercent),
                                    boxShadow: `0 0 10px ${getProgressColor(habit.progressPercent)}40` // 40 is alpha
                                }}
                            ></div>
                        </div>
                    </div>
                ))}

                {habits.length === 0 && (
                    <div className="empty-stats">
                        Add habits to see analytics
                    </div>
                )}
            </div>
        </div>
    );
};

export default HabitStats;
