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

      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
