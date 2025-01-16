import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, clearAllData }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-purple-600">Habitgram</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/daily-check-in"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Daily Check-In
                </Link>
                <Link
                  to="/mood-calendar"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={clearAllData}
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                title="Clear all stored data"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Your data is stored locally in your browser. No personal information is collected or transmitted.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
