import React, { useState } from 'react';

const HabitSelector = ({ habits, selectedHabit, onHabitSelect, onMarkHabit, onAddHabit }) => {
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      onAddHabit(newHabitName.trim());
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const getTodayCount = () => {
    if (!selectedHabit) return 0;
    const today = new Date().toISOString().split('T')[0];
    return selectedHabit.completedDates && selectedHabit.completedDates[today] ? selectedHabit.completedDates[today] : 0;
  };

  return (
    <div className="habit-selector">
      <h3>
        <i className="fas fa-target"></i>
        Track Habit
      </h3>
      
      <select 
        className="habit-dropdown"
        value={selectedHabit ? selectedHabit.id : ''}
        onChange={(e) => {
          const habit = habits.find(h => h.id === parseInt(e.target.value));
          onHabitSelect(habit);
        }}
      >
        <option value="">Select a habit to track</option>
        {habits.map(habit => (
          <option key={habit.id} value={habit.id}>
            {habit.name}
          </option>
        ))}
      </select>

      {selectedHabit && (
        <div>
          <button 
            className="mark-habit-btn"
            onClick={() => onMarkHabit(selectedHabit.id)}
          >
            <i className="fas fa-check"></i>
            Mark as Complete
          </button>
          {getTodayCount() > 0 && (
            <div style={{ 
              marginTop: '8px', 
              padding: '8px 12px', 
              background: '#f0f9ff', 
              border: '1px solid #0ea5e9', 
              borderRadius: '6px',
              fontSize: '0.875rem',
              color: '#0369a1',
              textAlign: 'center'
            }}>
              <i className="fas fa-check-circle"></i> {getTodayCount()} completion{getTodayCount() > 1 ? 's' : ''} today
            </div>
          )}
        </div>
      )}

      {!showAddForm ? (
        <button 
          className="mark-habit-btn"
          onClick={() => setShowAddForm(true)}
          style={{ 
            background: '#6366f1', 
            marginTop: '12px',
            fontSize: '0.875rem'
          }}
        >
          <i className="fas fa-plus"></i>
          Add New Habit
        </button>
      ) : (
        <form onSubmit={handleAddHabit} style={{ marginTop: '12px' }}>
          <input
            type="text"
            placeholder="Enter habit name..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '8px',
              fontSize: '1rem'
            }}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="submit"
              className="mark-habit-btn"
              style={{ 
                background: '#10b981',
                flex: 1,
                fontSize: '0.875rem'
              }}
            >
              Add
            </button>
            <button 
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setNewHabitName('');
              }}
              style={{
                padding: '12px 16px',
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HabitSelector;
