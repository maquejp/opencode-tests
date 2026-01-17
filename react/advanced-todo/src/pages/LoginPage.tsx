import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts';

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Save remember me preference
      localStorage.setItem('advanced-todo-remember-me', formData.rememberMe.toString());
      
      // For demo purposes, any email/password combination will work
      // In a real app, this would validate against a backend
      const success = await login(formData.email, formData.password || 'password');
      
      if (!success) {
        setError('Invalid email or password');
      }
      // Navigation will be handled automatically by App.tsx when currentUser changes
      
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Todo</h1>
          <p className="text-gray-600">Sign in to manage your tasks and projects</p>
        </div>

        {/* Demo credentials info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Email:</strong> alex@example.com</p>
            <p><strong>Password:</strong> password123</p>
            <p className="text-xs text-blue-600">Or any email with any password</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="•••••••••"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={formData.rememberMe}
                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path d="M4 12a8 8 0 4-4 0 0 1 4 1 4 0 0 1 1 4 1 0 4-2 2 2 0 4 4-0-1-1-1 1-1-1 1-1-1-1z" />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Clear Storage Option for Testing */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                localStorage.clear();
                setError('');
                window.location.reload();
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear All Data (Testing)
            </button>
          </div>

          {/* Quick Login Actions */}
          <div className="mt-6 text-center">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setFormData({ email: 'alex@example.com', password: 'password123', rememberMe: false });
                  setError('');
                }}
                className="w-full btn-secondary text-sm"
              >
                Use Alex Account
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-3 bg-gray-100 text-gray-500 text-sm">OR</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setFormData({ 
                    email: 'sarah@example.com', 
                    password: 'password123',
                    rememberMe: false 
                  });
                  setError('');
                }}
                className="w-full btn-secondary text-sm"
              >
                Use Sarah Account
              </button>
            </div>

            {/* Links */}
            <div className="mt-8 text-center space-x-4 text-sm">
              <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-primary-600 hover:text-primary-700">
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>&copy; 2024 Advanced Todo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;