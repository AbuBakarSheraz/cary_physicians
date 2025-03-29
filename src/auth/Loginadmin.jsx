import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  
  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@cppc.com';
  const ADMIN_PASSWORD = 'admin-cppc-786';
  
  // Check if user becomes authenticated and redirect
  useEffect(() => {
    if (isAuth) {
      navigate('/admin');
    }
  }, [isAuth, navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set authentication in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        // Set auth state to trigger navigation
        setIsAuth(true);
        console.log('Authentication successful, redirecting...');
      } else {
        setError('Invalid email or password');
        console.log('Authentication failed');
      }
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 space-y-6 relative overflow-hidden border-2 border-emerald-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Admin Login</h2>
          <p className="text-emerald-600">Enter your credentials to access the admin panel</p>
        </div>

        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 pr-4 py-2 block w-full border border-emerald-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-emerald-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-4 py-2 block w-full border border-emerald-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-emerald-500 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 transition duration-300">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;