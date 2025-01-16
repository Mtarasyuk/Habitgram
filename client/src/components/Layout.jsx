import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl mr-2" role="img" aria-label="habit">✨</span>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                  Habitgram
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  location.pathname === '/'
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
              >
                <span>Home</span>
              </Link>
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
