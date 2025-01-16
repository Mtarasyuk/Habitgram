import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import Modal from './Modal';
import DailyCheckIn from './DailyCheckIn';

const ViewCalendar = ({ checkInData, currentTime, setCheckInData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentTime);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moodColors = {
    'great': 'bg-pink-400',
    'good': 'bg-purple-300',
    'okay': 'bg-purple-400',
    'bad': 'bg-purple-600',
    'terrible': 'bg-blue-800',
    'sick': 'bg-red-400'
  };

  const moodEmojis = {
    'great': '😊',
    'good': '🙂',
    'okay': '😐',
    'bad': '😕',
    'terrible': '😢',
    'sick': '🤒'
  };

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weeks = [];
  let currentWeek = [];

  days.forEach(day => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getMoodForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return checkInData[dateStr]?.mood;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleCheckInComplete = (dateStr) => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get all check-ins for the current month
  const currentMonthCheckIns = Object.entries(checkInData)
    .filter(([date]) => {
      const checkInDate = parseISO(date);
      return checkInDate.getMonth() === selectedMonth.getMonth() &&
             checkInDate.getFullYear() === selectedMonth.getFullYear();
    })
    .sort((a, b) => parseISO(b[0]) - parseISO(a[0]));

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">View Calendar</h1>
        <Link to="/" className="text-purple-600 hover:text-purple-800">
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setSelectedMonth(date => new Date(date.getFullYear(), date.getMonth() - 1))}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold">
            {format(selectedMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setSelectedMonth(date => new Date(date.getFullYear(), date.getMonth() + 1))}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const mood = getMoodForDate(day);
              const isCurrentMonth = day.getMonth() === selectedMonth.getMonth();
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const dayData = checkInData[dateStr];

              return (
                <div
                  key={dateStr}
                  onClick={() => handleDateClick(day)}
                  className={`
                    aspect-square p-2 rounded-lg cursor-pointer
                    flex flex-col items-center justify-center
                    transition-all duration-200
                    ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                    ${isSelected ? 'ring-2 ring-purple-500' : ''}
                    ${mood ? moodColors[mood] : 'bg-gray-100'}
                    ${mood ? 'text-white' : 'text-gray-700'}
                    hover:ring-2 hover:ring-purple-300
                  `}
                >
                  <span className="text-sm font-medium">
                    {format(day, 'd')}
                  </span>
                  {mood && (
                    <span className="text-lg" title={`Mood: ${mood}`}>
                      {moodEmojis[mood]}
                    </span>
                  )}
                  {dayData && !mood && (
                    <span className="text-xs">✓</span>
                  )}
                </div>
              );
            })
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {Object.entries(moodColors).map(([mood, color]) => (
            <div key={mood} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${color}`}></div>
              <span className="capitalize text-gray-700">{mood}</span>
              <span>{moodEmojis[mood]}</span>
            </div>
          ))}
        </div>

        {/* Monthly Check-ins List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Daily Notes</h3>
          <div className="space-y-4">
            {currentMonthCheckIns.map(([date, data]) => {
              const checkInDate = parseISO(date);
              return (
                <div 
                  key={date} 
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDateClick(checkInDate)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{format(checkInDate, 'MMMM d, yyyy')}</h4>
                    <span className={`px-3 py-1 rounded-full ${moodColors[data.mood]} text-white`}>
                      {data.mood} {moodEmojis[data.mood]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <span className="text-gray-600">Energy Level:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 rounded-full h-2"
                          style={{ width: `${data.energy * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Focus Level:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 rounded-full h-2"
                          style={{ width: `${data.focus * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {data.gratitude && (
                    <div className="mt-2">
                      <span className="text-gray-600">Grateful for:</span>
                      <p className="text-gray-800">{data.gratitude}</p>
                    </div>
                  )}
                  {data.intentions && (
                    <div className="mt-2">
                      <span className="text-gray-600">Intentions:</span>
                      <p className="text-gray-800">{data.intentions}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {selectedDate && (
          <DailyCheckIn
            checkInData={checkInData}
            setCheckInData={setCheckInData}
            currentTime={selectedDate}
            selectedDate={selectedDate}
            onComplete={handleCheckInComplete}
            isModal={true}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewCalendar;
