import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import HabitTracker from './components/HabitTracker';
import DailyCheckIn from './components/DailyCheckIn';
import MeditationTimer from './components/MeditationTimer';
import ViewCalendar from './components/ViewCalendar';
import MonthlyHabitSummary from './components/MonthlyHabitSummary';

function App() {
  // Initialize state from localStorage or with default values
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  const [completions, setCompletions] = useState(() => {
    const savedCompletions = localStorage.getItem('completions');
    return savedCompletions ? JSON.parse(savedCompletions) : {};
  });

  const [checkInData, setCheckInData] = useState(() => {
    const savedCheckIns = localStorage.getItem('checkInData');
    return savedCheckIns ? JSON.parse(savedCheckIns) : {};
  });

  // Current time for the app
  const currentTime = new Date('2025-01-16T15:18:59-05:00');

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('completions', JSON.stringify(completions));
  }, [completions]);

  useEffect(() => {
    localStorage.setItem('checkInData', JSON.stringify(checkInData));
  }, [checkInData]);

  // Function to clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      localStorage.clear();
      setHabits([]);
      setCompletions({});
      setCheckInData({});
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
          <Route path="/view-calendar" element={<ViewCalendar checkInData={checkInData} currentTime={currentTime} setCheckInData={setCheckInData} />} />
          <Route path="/summary" element={<MonthlyHabitSummary habits={habits} completions={completions} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
