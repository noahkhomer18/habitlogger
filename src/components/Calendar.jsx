import React from 'react';

const Calendar = ({ habitData, onDayClick, currentDate }) => {
  // Generate the last 365 days
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const days = generateDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group days by weeks (53 weeks for a year)
  const weeks = [];
  for (let i = 0; i < 53; i++) {
    const weekDays = days.slice(i * 7, (i + 1) * 7);
    // Pad with empty days if needed
    while (weekDays.length < 7) {
      weekDays.push(null);
    }
    weeks.push(weekDays);
  }

  // Get month labels
  const getMonthLabels = () => {
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let currentMonth = -1;
    for (let i = 0; i < 53; i++) {
      const weekStart = days[i * 7];
      if (weekStart && weekStart.getMonth() !== currentMonth) {
        currentMonth = weekStart.getMonth();
        months.push({
          month: monthNames[currentMonth],
          position: i
        });
      }
    }
    return months;
  };

  const monthLabels = getMonthLabels();

  const isToday = (date) => {
    return date.getTime() === today.getTime();
  };

  const isCompleted = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return habitData[dateStr] && habitData[dateStr] > 0;
  };

  const getCompletionCount = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return habitData[dateStr] || 0;
  };

  const handleDayClick = (date) => {
    // Allow clicking on today and past days
    if (date <= today) {
      onDayClick(date);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">
          <i className="fas fa-calendar-alt"></i>
          Habit Calendar
          {habitData && Object.keys(habitData).length > 0 && (
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: '400', 
              color: '#6b7280',
              marginLeft: '8px'
            }}>
              (Click days to mark complete)
            </span>
          )}
        </h2>
        <div className="calendar-nav">
          <button>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="calendar-months">
        {monthLabels.map((month, index) => (
          <span 
            key={index}
            style={{ 
              gridColumn: `${month.position + 1} / span ${index < monthLabels.length - 1 ? monthLabels[index + 1].position - month.position : 53 - month.position}`
            }}
          >
            {month.month}
          </span>
        ))}
      </div>

      <div className="calendar-weekdays">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="weekday-label">
            {index % 7 === 0 ? day : ''}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {weeks.map((week, weekIndex) => 
          week.map((date, dayIndex) => {
            if (!date) {
              return <div key={`${weekIndex}-${dayIndex}`} className="calendar-day" style={{ visibility: 'hidden' }} />;
            }
            
            const completed = isCompleted(date);
            const completionCount = getCompletionCount(date);
            const todayClass = isToday(date) ? 'today' : '';
            const completedClass = completed ? 'completed' : '';
            
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`calendar-day ${todayClass} ${completedClass}`}
                onClick={() => handleDayClick(date)}
                title={`${date.toLocaleDateString()} - ${completed ? `${completionCount} completion${completionCount > 1 ? 's' : ''}` : 'Not completed'}`}
              />
            );
          })
        )}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color none"></div>
          <span>Less</span>
        </div>
        <div className="legend-item">
          <div className="legend-color completed"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
