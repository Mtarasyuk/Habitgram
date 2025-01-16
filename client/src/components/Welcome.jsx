import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  };

  const getRandomMotivationalQuote = () => {
    const quotes = [
      {
        text: "I have not failed. I've just found 10,000 ways that won't work.",
        author: "Thomas Edison"
      },
      {
        text: "People say nothing is impossible, but I do nothing every day.",
        author: "A. A. Milne (Winnie the Pooh)"
      },
      {
        text: "If you think you are too small to make a difference, try sleeping with a mosquito.",
        author: "Dalai Lama"
      },
      {
        text: "Even if you are on the right track, you'll get run over if you just sit there.",
        author: "Will Rogers"
      },
      {
        text: "The road to success is dotted with many tempting parking spaces.",
        author: "Will Rogers"
      },
      {
        text: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon"
      },
      {
        text: "The brain is wonderful. It starts working the moment you get up and doesn't stop until you get to the office.",
        author: "Robert Frost"
      },
      {
        text: "Do or do not. There is no try.",
        author: "Yoda"
      },
      {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
      },
      {
        text: "Life is like a sewer... what you get out of it depends on what you put into it.",
        author: "Tom Lehrer"
      }
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <div className="text-gray-600 text-lg mb-8">
        <p className="italic">"{quote.text}"</p>
        <p className="text-sm text-gray-500 mt-2">— {quote.author}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Habitgram
          </h1>

          {/* Quote of the day */}
          {getRandomMotivationalQuote()}

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Started
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/daily-checkin"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Daily Check-In
              </Link>
              <Link
                to="/view-calendar"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                View Calendar
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Track Your Progress
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/habits"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Daily Habits
              </Link>
              <Link
                to="/summary"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Monthly Summary
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Mindfulness
            </h2>
            <Link
              to="/meditation"
              className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors w-full"
            >
              Meditation Timer
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-sm mt-8">
            <h3 className="font-medium text-gray-800 mb-2">Your Privacy Matters</h3>
            <ul className="text-left text-gray-600 space-y-1 mb-2">
              <li> All data stays on your device</li>
              <li> No account required</li>
              <li> No data collection or tracking</li>
              <li> No external servers involved</li>
            </ul>
            <p className="text-xs text-gray-500">
              Note: Your data is stored in your browser's local storage. Clear your browser data if you want to remove all entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
