import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, onToggle, onEdit, onDelete }) => {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-plus-circle"></i>
        <h3>No habits yet</h3>
        <p>Add your first habit to start tracking your progress!</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;
