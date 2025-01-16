import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, startOfWeek, endOfWeek, isAfter, startOfDay } from 'date-fns';
import DailyCheckIn from './DailyCheckIn';

const MoodCalendar = ({ checkInData, currentTime, setCheckInData }) => {
  const [selectedDate, setSelectedDate] = useState(currentTime);
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);

  // Get the start of the month
  const monthStart = startOfMonth(selectedDate);
  // Get the start of the week that contains the first day of the month
  const calendarStart = startOfWeek(monthStart);
  // Get the end of the month
  const monthEnd = endOfMonth(selectedDate);
  // Get the end of the week that contains the last day of the month
  const calendarEnd = endOfWeek(monthEnd);
  
  // Get all days that should be shown on the calendar
  const calendarDays = eachDayOfInterval({ 
    start: calendarStart,
    end: calendarEnd 
  });

  const getMoodColor = (mood, energy, focus) => {
    // Calculate an overall positivity score based on mood, energy, and focus
    let moodScore;
    switch (mood) {
      case 'Very Happy': moodScore = 1; break;
      case 'Happy': moodScore = 0.5; break;
      case 'Neutral': moodScore = 0; break;
      case 'Sad': moodScore = -0.5; break;
      case 'Very Sad': moodScore = -1; break;
      default: moodScore = 0;
    }

    // Normalize energy and focus to -1 to 1 scale
    const energyScore = (energy / 10) * 2 - 1;
    const focusScore = (focus / 10) * 2 - 1;

    // Calculate overall score (-1 to 1)
    const overallScore = (moodScore + energyScore + focusScore) / 3;

    // Convert score to color
    if (overallScore > 0) {
      // Positive score: blue gradient
      const intensity = Math.round(overallScore * 100);
      return `bg-blue-${100 + intensity}`;
    } else {
      // Negative score: pink gradient
      const intensity = Math.round(Math.abs(overallScore) * 100);
      return `bg-pink-${100 + intensity}`;
    }
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      'Very Happy': '😊',
      'Happy': '🙂',
      'Neutral': '😐',
      'Sad': '😔',
      'Very Sad': '😢'
    };
    return emojis[mood] || '😐';
  };

  const handleDateClick = (date) => {
    const isFuture = isAfter(startOfDay(date), startOfDay(currentTime));
    if (isFuture) return;

    setSelectedDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    if (!checkInData[dateStr]) {
      setShowDailyCheckIn(true);
    }
  };

  const handleCheckInComplete = (dateStr) => {
    setShowDailyCheckIn(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Modal for DailyCheckIn */}
      {showDailyCheckIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setShowDailyCheckIn(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <DailyCheckIn
              checkInData={checkInData}
              setCheckInData={setCheckInData}
              currentTime={currentTime}
              selectedDate={selectedDate}
              onComplete={handleCheckInComplete}
              isModal={true}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="text-sm text-gray-500">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}

          {calendarDays.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const dayData = checkInData[dateStr];
            const isFuture = isAfter(startOfDay(date), startOfDay(currentTime));
            
            const moodClass = dayData && !isFuture
              ? getMoodColor(dayData.mood, dayData.energy, dayData.focus)
              : 'bg-gray-50';
            
            const isToday = format(date, 'yyyy-MM-dd') === format(currentTime, 'yyyy-MM-dd');
            const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            const isCurrentMonth = isSameMonth(date, selectedDate);
            
            return (
              <button
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                className={`p-2 rounded-lg transition-all ${moodClass} hover:shadow-md
                  ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                  ${isSelected ? 'ring-2 ring-purple-500' : ''}
                  ${isToday ? 'ring-2 ring-blue-500' : ''}
                  ${isFuture ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                  ${!dayData && !isFuture ? 'hover:bg-purple-50' : ''}
                `}
                disabled={isFuture}
              >
                <div className="text-center">
                  <span className={`text-sm font-medium 
                    ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                    ${isFuture ? 'text-gray-300' : ''}
                  `}>
                    {format(date, 'd')}
                  </span>
                  {dayData && !isFuture && (
                    <div className="flex flex-col items-center mt-1 text-xs">
                      <span role="img" aria-label={dayData.mood}>
                        {getMoodEmoji(dayData.mood)}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Details */}
        {(() => {
          const dateStr = format(selectedDate, 'yyyy-MM-dd');
          const dayData = checkInData[dateStr];
          const isFuture = isAfter(startOfDay(selectedDate), startOfDay(currentTime));
          
          if (isFuture) {
            return (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                Future date - no entries available
              </div>
            );
          }
          
          if (!dayData) {
            return (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                <p className="mb-4">No entry for {format(selectedDate, 'MMMM d, yyyy')}</p>
                <button
                  onClick={() => setShowDailyCheckIn(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Entry
                </button>
              </div>
            );
          }

          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  Entry for {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <button
                  onClick={() => setShowDailyCheckIn(true)}
                  className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Edit Entry
                </button>
              </div>

              {/* Mood, Energy, Focus Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Mood</div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{getMoodEmoji(dayData.mood)}</span>
                    <span className="font-medium">{dayData.mood}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Energy</div>
                  <div className="font-medium">
                    <span className="text-2xl mr-2">⚡️</span>
                    {dayData.energy}/10
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Focus</div>
                  <div className="font-medium">
                    <span className="text-2xl mr-2">🎯</span>
                    {dayData.focus}/10
                  </div>
                </div>
              </div>

              {/* Gratitude and Intentions */}
              <div className="grid grid-cols-2 gap-4">
                {dayData.gratitude && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Gratitude</div>
                    <div className="text-sm">{dayData.gratitude}</div>
                  </div>
                )}
                {dayData.intentions && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Intentions</div>
                    <div className="text-sm">{dayData.intentions}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default MoodCalendar;
