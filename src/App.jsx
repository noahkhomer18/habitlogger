import React, { useState, useEffect } from 'react';
import './styles/App.css';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import Stats from './components/Stats';

function App() {
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      completed: false,
      streak: 0,
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completed;
        return {
          ...habit,
          completed: !habit.completed,
          streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const editHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const newName = prompt('Edit habit name:', habit.name);
      if (newName && newName.trim()) {
        setHabits(habits.map(h => 
          h.id === id ? { ...h, name: newName.trim() } : h
        ));
      }
    }
  };

  const deleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== id));
    }
  };

  const resetDay = () => {
    if (window.confirm('Reset all habits for a new day?')) {
      setHabits(habits.map(habit => ({
        ...habit,
        completed: false
      })));
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1><i className="fas fa-chart-line"></i> Habit Logger</h1>
          <p>Track your daily habits and build lasting positive changes</p>
        </header>

        <div className="main-content">
          <div className="card">
            <h2>
              <i className="fas fa-plus-circle"></i>
              Add New Habit
            </h2>
            <AddHabitForm onAddHabit={addHabit} />
            
            <h2>
              <i className="fas fa-list-check"></i>
              Your Habits
            </h2>
            <HabitList 
              habits={habits}
              onToggle={toggleHabit}
              onEdit={editHabit}
              onDelete={deleteHabit}
            />
            
            {habits.length > 0 && (
              <button 
                className="btn btn-edit" 
                onClick={resetDay}
                style={{ marginTop: '20px', width: '100%' }}
              >
                <i className="fas fa-redo"></i>
                Reset Day
              </button>
            )}
          </div>

          <div className="card">
            <h2>
              <i className="fas fa-chart-bar"></i>
              Statistics
            </h2>
            <Stats habits={habits} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
