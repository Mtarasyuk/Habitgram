import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, differenceInDays, parseISO, isToday } from 'date-fns';

const QUOTES = [
  "Consistency is the key to greatness! 🔑",
  "Building habits like a boss! 💪",
  "Your future self will thank you! 🙏",
  "Every streak starts with day one! 🌟",
  "You're on fire! Keep that streak alive! 🔥",
  "Making excellence a habit! ✨",
  "Streak mode: ACTIVATED! 🚀",
  "You're basically a habit superhero! 🦸‍♀️",
  "Crushing goals, one habit at a time! 💫",
  "Your dedication is showing! 🌈"
];

const HabitTracker = ({ habits, setHabits, completions, setCompletions }) => {
  const [newHabit, setNewHabit] = useState('');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('anytime');
  
  // Get random quote
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim()) {
      const habit = {
        id: Date.now().toString(),
        name: newHabit.trim(),
        timeOfDay: selectedTimeOfDay,
        createdAt: new Date().toISOString()
      };
      setHabits([...habits, habit]);
      setNewHabit('');
      setSelectedTimeOfDay('anytime');
    }
  };

  const toggleHabit = (habitId) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedCompletions = { ...completions };
    
    if (!updatedCompletions[today]) {
      updatedCompletions[today] = [];
    }

    if (updatedCompletions[today].includes(habitId)) {
      updatedCompletions[today] = updatedCompletions[today].filter(h => h !== habitId);
    } else {
      updatedCompletions[today].push(habitId);
    }

    setCompletions(updatedCompletions);
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
    
    const updatedCompletions = { ...completions };
    Object.keys(updatedCompletions).forEach(date => {
      updatedCompletions[date] = updatedCompletions[date].filter(id => id !== habitId);
    });
    setCompletions(updatedCompletions);
  };

  const calculateStreak = (habitId) => {
    let streak = 0;
    let currentDate = new Date();
    
    // If habit is not completed today, check until yesterday
    if (!isHabitCompleted(habitId) && !isToday(currentDate)) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    while (true) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      if (!completions[dateStr]?.includes(habitId)) {
        break;
      }
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '✨';
    if (streak >= 3) return '💫';
    return '🌱';
  };

  const isHabitCompleted = (habitId) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return completions[today]?.includes(habitId) || false;
  };

  const getTimeOfDayColor = (timeOfDay) => {
    switch (timeOfDay) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800';
      case 'evening':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Daily Habits</h1>
        <Link to="/" className="text-purple-600 hover:text-purple-800">
          ← Back to Home
        </Link>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6 text-center">
        <p className="text-lg font-medium text-purple-800">{randomQuote}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={addHabit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            <select
              value={selectedTimeOfDay}
              onChange={(e) => setSelectedTimeOfDay(e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="anytime">Anytime</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No habits added yet. Add your first habit above!
            </div>
          ) : (
            habits.map((habit) => {
              const streak = calculateStreak(habit.id);
              return (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isHabitCompleted(habit.id)
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-300 hover:border-purple-500'
                        }`}
                    >
                      {isHabitCompleted(habit.id) && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </button>
                    <span className="text-gray-900">{habit.name}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTimeOfDayColor(habit.timeOfDay)}`}>
                      {habit.timeOfDay.charAt(0).toUpperCase() + habit.timeOfDay.slice(1)}
                    </span>
                    {streak > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-purple-600">
                          {streak} day{streak !== 1 ? 's' : ''} 
                        </span>
                        <span className="text-xl" title={`${streak} day streak!`}>
                          {getStreakEmoji(streak)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      Started {format(parseISO(habit.createdAt), 'MMM d, yyyy')}
                    </div>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
