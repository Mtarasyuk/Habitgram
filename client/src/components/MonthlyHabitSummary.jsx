import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO, isToday } from 'date-fns';

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

const MonthlyHabitSummary = ({ habits, completions }) => {
  // Get random quote
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

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

  // Group habits by time of day
  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.timeOfDay]) {
      acc[habit.timeOfDay] = [];
    }
    acc[habit.timeOfDay].push(habit);
    return acc;
  }, {});

  // Sort time periods in preferred order
  const timePeriods = ['morning', 'anytime', 'evening'];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Monthly Summary</h1>
        <Link to="/" className="text-purple-600 hover:text-purple-800">
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {habits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No habits added yet. Add some habits to see your progress!
          </div>
        ) : (
          <>
            {/* Streak Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Current Streaks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits
                  .sort((a, b) => calculateStreak(b.id) - calculateStreak(a.id))
                  .map(habit => {
                    const streak = calculateStreak(habit.id);
                    return (
                      <div
                        key={habit.id}
                        className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl" title={`${streak} day streak!`}>
                            {getStreakEmoji(streak)}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{habit.name}</div>
                            <div className="text-sm text-gray-500">
                              {streak} day{streak !== 1 ? 's' : ''} streak
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTimeOfDayColor(habit.timeOfDay)}`}>
                          {habit.timeOfDay.charAt(0).toUpperCase() + habit.timeOfDay.slice(1)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Time of Day Breakdown */}
            {timePeriods.map(period => {
              const periodHabits = groupedHabits[period];
              if (!periodHabits?.length) return null;

              return (
                <div key={period} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 capitalize">
                    {period} Habits
                  </h2>
                  <div className="space-y-4">
                    {periodHabits.map(habit => {
                      const streak = calculateStreak(habit.id);
                      return (
                        <div
                          key={habit.id}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-gray-900">{habit.name}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-purple-600">
                                {streak} day{streak !== 1 ? 's' : ''}
                              </span>
                              <span className="text-xl" title={`${streak} day streak!`}>
                                {getStreakEmoji(streak)}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Started {format(parseISO(habit.createdAt), 'MMM d, yyyy')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MonthlyHabitSummary;
