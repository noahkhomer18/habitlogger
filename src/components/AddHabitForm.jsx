import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new habit..."
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        maxLength={50}
      />
      <button type="submit">
        <i className="fas fa-plus"></i>
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
