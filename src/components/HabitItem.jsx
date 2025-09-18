import React from 'react';

const HabitItem = ({ habit, onToggle, onEdit, onDelete }) => {
  const handleToggle = () => {
    onToggle(habit.id);
  };

  const handleEdit = () => {
    onEdit(habit.id);
  };

  const handleDelete = () => {
    onDelete(habit.id);
  };

  return (
    <div className="habit-item">
      <div className="habit-info">
        <div 
          className={`habit-checkbox ${habit.completed ? 'checked' : ''}`}
          onClick={handleToggle}
        >
          {habit.completed && <i className="fas fa-check"></i>}
        </div>
        <span className="habit-name">{habit.name}</span>
        {habit.streak > 0 && (
          <div className="habit-streak">
            <i className="fas fa-fire"></i>
            {habit.streak} days
          </div>
        )}
      </div>
      <div className="habit-actions">
        <button className="btn btn-edit" onClick={handleEdit}>
          <i className="fas fa-edit"></i>
          Edit
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          <i className="fas fa-trash"></i>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
