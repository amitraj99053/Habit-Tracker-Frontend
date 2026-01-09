import React, { useMemo } from 'react';
import './HabitStats.css';
import { Trophy, TrendingUp, Activity } from 'lucide-react';

const HabitStats = ({ habits, currentMonth }) => {

    const statsData = useMemo(() => {
        if (!habits.length) return { overallAvg: 0, bestHabit: null, allStats: [] };

        let totalProgress = 0;
        let bestHabit = null;
        let maxProgress = -1;

        const allStats = habits.map(habit => {
            const goal = habit.goal || 30;
            const actual = habit.completedDates.filter(date => {
                const d = new Date(date);
                return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            }).length;

            const progressPercent = Math.min((actual / goal) * 100, 100);
            totalProgress += progressPercent;

            if (progressPercent > maxProgress) {
                maxProgress = progressPercent;
                bestHabit = habit;
            }

            return { ...habit, goal, actual, progressPercent };
        });

        const overallAvg = Math.round(totalProgress / habits.length);

        return { overallAvg, bestHabit, allStats };
    }, [habits, currentMonth]);

    const { overallAvg, bestHabit, allStats } = statsData;

    const getProgressColor = (percent) => {
        if (percent >= 80) return '#D7FF00'; // Neon Green
        if (percent >= 50) return '#fbbf24'; // Warning Yellow
        return '#ef4444'; // Danger Red
    };

    return (
        <div className="habit-stats-cont">
            <div className="stats-header">
                <h3>Performance Overview</h3>
                <span className="stats-subtitle">Your monthly progress analytics</span>
            </div>

            {/* Top Level Widgets */}
            <div className="stats-widgets">
                <div className="widget-card">
                    <div className="widget-icon primary">
                        <Activity size={20} />
                    </div>
                    <div>
                        <span className="widget-label">Avg. Consistency</span>
                        <div className="widget-value">{overallAvg}%</div>
                    </div>
                </div>

                <div className="widget-card">
                    <div className="widget-icon accent">
                        <Trophy size={20} color="#ffd700" />
                    </div>
                    <div>
                        <span className="widget-label">Top Performer</span>
                        <div className="widget-value small">{bestHabit ? bestHabit.name : '-'}</div>
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
                            <span>{habit.actual} / {habit.goal} days</span>
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
