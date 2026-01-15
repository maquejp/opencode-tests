import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts';
import NotificationCenter from './NotificationCenter';

interface HeaderProps {
  currentView?: 'tasks' | 'users' | 'projects' | 'gantt' | 'project-detail';
  setCurrentView?: (view: 'tasks' | 'users' | 'projects' | 'gantt' | 'project-detail') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Advanced Todo</h1>
            </div>
          </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                window.location.pathname === '/' || window.location.pathname.startsWith('/tasks')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tasks
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/projects"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    window.location.pathname.startsWith('/projects')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Projects
                </Link>
                <Link
                  to="/users"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    window.location.pathname === '/users'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Users
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center gap-3">
            <NotificationCenter />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <div className="hidden sm:flex items-center gap-3">
              <img
                src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
              </div>
              
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 mt-4">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  window.location.pathname === '/' || window.location.pathname.startsWith('/tasks')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tasks
              </Link>
              {currentUser && (
                <>
                  <Link
                    to="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      window.location.pathname.startsWith('/projects')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/users"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      window.location.pathname === '/users'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Users
                  </Link>
                </>
              )}
              
              {/* Mobile user info and logout */}
              <div className="border-t border-gray-200 pt-4 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;