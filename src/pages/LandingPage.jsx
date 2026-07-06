import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { habitService } from '../api/habitService';
import { taskService } from '../api/taskService';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        streak: 0,
        tasksCompleted: 0,
        totalTasks: 0,
        productivityScore: 0
    });

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {
            try {
                const [habits, tasks] = await Promise.all([
                    habitService.getAllHabits(),
                    taskService.getAllTasks()
                ]);

                // Calculate current streak
                let maxStreak = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                habits.forEach(habit => {
                    let streak = 0;
                    let checkDate = new Date(today);
                    
                    while (true) {
                        const dateStr = checkDate.toDateString();
                        const isCompleted = habit.completedDates.some(d => new Date(d).toDateString() === dateStr);
                        if (isCompleted) {
                            streak++;
                            checkDate.setDate(checkDate.getDate() - 1);
                        } else {
                            if (checkDate.getTime() === today.getTime()) {
                                checkDate.setDate(checkDate.getDate() - 1);
                                const wasCompletedYesterday = habit.completedDates.some(d => new Date(d).toDateString() === checkDate.toDateString());
                                if (wasCompletedYesterday) {
                                    continue;
                                }
                            }
                            break;
                        }
                    }
                    if (streak > maxStreak) maxStreak = streak;
                });

                // Calculate completed tasks
                const completedTasks = tasks.filter(t => t.status === 'Done').length;

                // Calculate productivity score based on completions today
                const habitsCompletedToday = habits.filter(habit =>
                    habit.completedDates.some(d => new Date(d).toDateString() === today.toDateString())
                ).length;
                const totalHabits = habits.length;
                const habitScore = totalHabits > 0 ? (habitsCompletedToday / totalHabits) * 100 : 0;
                const taskScore = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

                let finalScore = 0;
                if (totalHabits > 0 && tasks.length > 0) {
                    finalScore = Math.round((habitScore + taskScore) / 2);
                } else {
                    finalScore = Math.round(totalHabits > 0 ? habitScore : (tasks.length > 0 ? taskScore : 0));
                }

                setStats({
                    streak: maxStreak,
                    tasksCompleted: completedTasks,
                    totalTasks: tasks.length,
                    productivityScore: finalScore
                });
            } catch (error) {
                console.error("Failed to load landing page stats", error);
            }
        };

        fetchStats();
    }, [user]);

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-label">🚀 #1 Habit Tracking Tool</span>
                    <h1 className="hero-title">
                        Crush Goals with <br />
                        <span className="highlight">Focus & Clarity.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Stop dreaming and start doing. The ultimate tracking system designed to build consistency and accelerate your growth.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-btn primary" onClick={() => navigate('/services')}>Choose Tracker</button>
                        <button className="cta-btn secondary">View Demo</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card">
                        <h3>Daily Overview</h3>
                        <div className="mock-stat">
                            <div className="stat-icon">🔥</div>
                            <div>
                                <strong>Current Streak</strong>
                                <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                                    {user ? `${stats.streak} Days Consistent` : "12 Days Consistent"}
                                </div>
                            </div>
                        </div>
                        <div className="mock-stat">
                            <div className="stat-icon">✅</div>
                            <div>
                                <strong>Tasks Completed</strong>
                                <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                                    {user ? `${stats.tasksCompleted}/${stats.totalTasks} Done` : "8/10 Today"}
                                </div>
                            </div>
                        </div>
                        <div className="mock-stat">
                            <div className="stat-icon">📈</div>
                            <div>
                                <strong>Productivity Score</strong>
                                <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                                    {user ? `${stats.productivityScore}% Efficiency` : "94% Efficiency"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stat-item">
                    <span className="stat-number">900+</span>
                    <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Success Rate</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">30d</span>
                    <span className="stat-label">Avg. Streak</span>
                </div>
            </section>

            <section className="features">
                <div className="section-header">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <p>Features designed for peak performers.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Deep Analytics</h3>
                        <p>Visualize your progress with stunning charts and uncover hidden patterns in your behavior.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔔</div>
                        <h3>Smart Nudges</h3>
                        <p>Intelligent reminders that adapt to your schedule, ensuring you never miss a beat.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Goal Architecture</h3>
                        <p>Break down massive goals into manageable daily actions. The clarity you need to succeed.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
