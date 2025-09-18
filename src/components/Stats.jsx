import React from 'react';

const Stats = ({ habits }) => {
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completed).length;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{totalHabits}</div>
        <div className="stat-label">Total Habits</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{completedToday}</div>
        <div className="stat-label">Completed Today</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{totalStreak}</div>
        <div className="stat-label">Total Streak</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{completionRate}%</div>
        <div className="stat-label">Completion Rate</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
