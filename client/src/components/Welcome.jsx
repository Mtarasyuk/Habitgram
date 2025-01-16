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
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      },
      {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
      },
      {
        text: "Do or do not. There is no try.",
        author: "Yoda"
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

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Started
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/daily-check-in"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Daily Check-In
              </Link>
              <Link
                to="/mood-calendar"
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

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Mindfulness
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/meditation"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Meditation
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-sm">
            <h3 className="font-medium text-gray-800 mb-2">Your Privacy Matters</h3>
            <ul className="text-left text-gray-600 space-y-1 mb-2">
              <li>✅ All data stays on your device</li>
              <li>✅ No account required</li>
              <li>✅ No data collection or tracking</li>
              <li>✅ No external servers involved</li>
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
