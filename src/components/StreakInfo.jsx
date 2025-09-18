import React from 'react';

const StreakInfo = ({ selectedHabit }) => {
  if (!selectedHabit) {
    return (
      <div className="streak-info">
        <h3>
          <i className="fas fa-fire"></i>
          Streak Info
        </h3>
        <div className="streak-stats">
          <div className="streak-stat">
            <span className="streak-label">Select a habit to view streaks</span>
          </div>
        </div>
      </div>
    );
  }

  const calculateStreaks = () => {
    if (!selectedHabit.completedDates) {
      return { currentStreak: 0, longestStreak: 0, totalDays: 0 };
    }

    const dates = Object.keys(selectedHabit.completedDates)
      .filter(date => selectedHabit.completedDates[date])
      .sort();

    if (dates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalDays: 0 };
    }

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (selectedHabit.completedDates[dateStr]) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    dates.forEach(dateStr => {
      const date = new Date(dateStr);
      
      if (lastDate === null || date.getTime() - lastDate.getTime() === 24 * 60 * 60 * 1000) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
      
      lastDate = date;
    });
    
    longestStreak = Math.max(longestStreak, tempStreak);

    return {
      currentStreak,
      longestStreak,
      totalDays: dates.length
    };
  };

  const { currentStreak, longestStreak, totalDays } = calculateStreaks();

  return (
    <div className="streak-info">
      <h3>
        <i className="fas fa-fire"></i>
        Streak Info
      </h3>
      <div className="streak-stats">
        <div className="streak-stat">
          <span className="streak-label">Current Streak</span>
          <span className="streak-value current-streak">
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
          </span>
        </div>
        <div className="streak-stat">
          <span className="streak-label">Longest Streak</span>
          <span className="streak-value longest-streak">
            {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
          </span>
        </div>
        <div className="streak-stat">
          <span className="streak-label">Total Days</span>
          <span className="streak-value">
            {totalDays} {totalDays === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreakInfo;
