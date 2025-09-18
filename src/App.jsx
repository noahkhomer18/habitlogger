import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Calendar from './components/Calendar';
import HabitSelector from './components/HabitSelector';
import StreakInfo from './components/StreakInfo';

function App() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

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
      completedDates: {},
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
  };

  const markHabitComplete = (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completedDates: {
            ...habit.completedDates,
            [today]: true
          }
        };
      }
      return habit;
    }));
  };

  const toggleDay = (date) => {
    if (!selectedHabit) return;
    
    const dateStr = date.toISOString().split('T')[0];
    const isCompleted = selectedHabit.completedDates && selectedHabit.completedDates[dateStr];
    
    setHabits(habits.map(habit => {
      if (habit.id === selectedHabit.id) {
        return {
          ...habit,
          completedDates: {
            ...habit.completedDates,
            [dateStr]: !isCompleted
          }
        };
      }
      return habit;
    }));
  };

  // Get habit data for calendar display
  const getHabitData = () => {
    if (!selectedHabit) return {};
    return selectedHabit.completedDates || {};
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1><i className="fas fa-calendar-alt"></i> Habit Logger</h1>
          <p>Track your habits with a visual calendar. See your progress over time and build lasting streaks.</p>
        </header>

        <div className="main-content">
          <div className="calendar-section">
            <Calendar 
              habitData={getHabitData()}
              onDayClick={toggleDay}
              currentDate={new Date()}
            />
            
            <div className="sidebar">
              <HabitSelector
                habits={habits}
                selectedHabit={selectedHabit}
                onHabitSelect={setSelectedHabit}
                onMarkHabit={markHabitComplete}
                onAddHabit={addHabit}
              />
              
              <StreakInfo selectedHabit={selectedHabit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
