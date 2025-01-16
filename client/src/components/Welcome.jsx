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
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          {getTimeBasedGreeting()}! 
        </h1>
        
        {getRandomMotivationalQuote()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/daily-checkin"
            className="block p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Daily Check-in</h3>
            <p className="text-gray-600">Record how you're feeling and set your intentions for the day.</p>
          </Link>

          <Link
            to="/habits"
            className="block p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Daily Habits</h3>
            <p className="text-gray-600">Track your progress and maintain your streak.</p>
          </Link>

          <Link
            to="/meditation"
            className="block p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">Meditation</h3>
            <p className="text-gray-600">Take a moment to breathe and center yourself.</p>
          </Link>

          <Link
            to="/summary"
            className="block p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Monthly Summary</h3>
            <p className="text-gray-600">View your mood patterns and progress over time.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
