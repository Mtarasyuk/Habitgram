import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import HabitTracker from './components/HabitTracker';
import DailyCheckIn from './components/DailyCheckIn';
import MeditationTimer from './components/MeditationTimer';
import MoodCalendar from './components/MoodCalendar';
import { parseISO, isAfter, startOfDay } from 'date-fns';

function App() {
  console.log('App rendering');
  
  const currentTime = parseISO('2025-01-16T12:20:18-05:00'); // Using the provided current time
  
  // Lift state up to App level
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('zenith_habits');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [completions, setCompletions] = useState(() => {
    const saved = localStorage.getItem('zenith_completions');
    return saved ? JSON.parse(saved) : {};
  });

  const [checkInData, setCheckInData] = useState(() => {
    const saved = localStorage.getItem('checkInData');
    if (!saved) return {};
    
    // Filter out future entries
    const data = JSON.parse(saved);
    const filteredData = Object.entries(data).reduce((acc, [date, entry]) => {
      const entryDate = parseISO(entry.timestamp);
      if (!isAfter(startOfDay(entryDate), startOfDay(currentTime))) {
        acc[date] = entry;
      }
      return acc;
    }, {});
    
    return filteredData;
  });

  const [moodData, setMoodData] = useState(() => {
    const saved = localStorage.getItem('zenith_moods');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('zenith_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('zenith_completions', JSON.stringify(completions));
  }, [completions]);

  useEffect(() => {
    localStorage.setItem('checkInData', JSON.stringify(checkInData));
  }, [checkInData]);

  useEffect(() => {
    localStorage.setItem('zenith_moods', JSON.stringify(moodData));
  }, [moodData]);

  const clearAllData = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear all your data? This action cannot be undone.'
    );
    
    if (confirmClear) {
      localStorage.removeItem('zenith_habits');
      localStorage.removeItem('zenith_completions');
      localStorage.removeItem('checkInData');
      localStorage.removeItem('zenith_moods');
      
      setHabits([]);
      setCompletions({});
      setCheckInData({});
      setMoodData([]);
    }
  };

  return (
    <Router>
      <Layout clearAllData={clearAllData}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/daily-checkin" element={<DailyCheckIn checkInData={checkInData} setCheckInData={setCheckInData} currentTime={currentTime} />} />
          <Route path="/habits" element={<HabitTracker habits={habits} setHabits={setHabits} completions={completions} setCompletions={setCompletions} />} />
          <Route path="/meditation" element={<MeditationTimer />} />
          <Route path="/summary" element={<MoodCalendar checkInData={checkInData} currentTime={currentTime} setCheckInData={setCheckInData} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
