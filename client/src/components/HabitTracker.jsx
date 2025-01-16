import React, { useState } from 'react';
import { format, subDays, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const HabitTracker = ({ habits, setHabits, completions, setCompletions }) => {
  console.log('HabitTracker rendering with habits:', habits, 'and completions:', completions);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedTime, setSelectedTime] = useState('anytime');
  const today = format(new Date(), 'yyyy-MM-dd');

  const calculateStreak = (habitId) => {
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayCompletions = completions[dateStr] || [];
      
      if (!dayCompletions.includes(habitId)) {
        break;
      }
      
      streak++;
      currentDate = subDays(currentDate, 1);
    }
    
    return streak;
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit = { 
        id: Date.now().toString(),
        name: newHabitName.trim(),
        createdAt: new Date().toISOString(),
        timeOfDay: selectedTime
      };
      console.log('Adding new habit:', newHabit);
      setHabits(prevHabits => [...prevHabits, newHabit]);
      setNewHabitName('');
    }
  };

  const deleteHabit = (habitId) => {
    console.log('Deleting habit:', habitId);
    setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));
    
    setCompletions(prevCompletions => {
      const newCompletions = { ...prevCompletions };
      Object.keys(newCompletions).forEach(date => {
        if (Array.isArray(newCompletions[date])) {
          newCompletions[date] = newCompletions[date].filter(id => id !== habitId);
        }
      });
      return newCompletions;
    });
  };

  const toggleHabit = (habitId) => {
    console.log('Toggling habit:', habitId, 'for date:', today);
    setCompletions(prevCompletions => {
      const todayCompletions = prevCompletions[today] || [];
      const isCompleted = todayCompletions.includes(habitId);
      
      const newCompletions = {
        ...prevCompletions,
        [today]: isCompleted
          ? todayCompletions.filter(id => id !== habitId)
          : [...todayCompletions, habitId]
      };
      
      console.log('New completions state:', newCompletions);
      return newCompletions;
    });
  };

  const isHabitCompleted = (habitId) => {
    const todayCompletions = completions[today] || [];
    return todayCompletions.includes(habitId);
  };

  const getTimeOfDayIcon = (timeOfDay) => {
    switch (timeOfDay) {
      case 'morning':
        return '🌅';
      case 'afternoon':
        return '☀️';
      case 'evening':
        return '🌙';
      default:
        return '⭐';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Habits</h2>

          {/* Add Habit Form */}
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addHabit();
                  }
                }}
                placeholder="Enter new habit..."
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={addHabit}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Habit
              </button>
            </div>
            
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="p-2 border rounded-lg text-gray-700 w-full"
            >
              <option value="anytime">⭐ Anytime</option>
              <option value="morning">🌅 Morning</option>
              <option value="afternoon">☀️ Afternoon</option>
              <option value="evening">🌙 Evening</option>
            </select>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            <AnimatePresence>
              {habits.map((habit) => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isHabitCompleted(habit.id)
                      ? 'bg-purple-50'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isHabitCompleted(habit.id)
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-600'
                      }`}
                    >
                      {isHabitCompleted(habit.id) && (
                        <motion.svg 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </motion.svg>
                      )}
                    </motion.button>
                    <div>
                      <span className={`text-lg ${
                        isHabitCompleted(habit.id) ? 'text-purple-600' : 'text-gray-700'
                      }`}>
                        {habit.name}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{getTimeOfDayIcon(habit.timeOfDay)}</span>
                        <span>Streak: {calculateStreak(habit.id)} days</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteHabit(habit.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {habits.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No habits added yet. Add your first habit above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
