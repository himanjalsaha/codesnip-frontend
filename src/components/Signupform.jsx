import React, { useState } from 'react';
import logo from '../assets/logo-dark.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader for loading animation
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export default function Signupform() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading button

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true on form submit

    try {
      await signup(email, password, username);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state back to false after signup attempt
    }
  };

  return (
    <div className="flex min-h-full bg-gray-900 flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-20 w-24" src={logo} alt="Your Company" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.94 6.94a1 1 0 01.282-.282l6-4.5a1 1 0 011.555.833v2.05a1.75 1.75 0 00-1.486 1.68V10h.004a1 1 0 00.946.875h.054a1 1 0 00.946-.875h.004v-3.276a1.75 1.75 0 00-1.486-1.68V3.75a1 1 0 011.555-.833l6 4.5a1 1 0 01.282.282c.08.103.147.215.202.332a1.758 1.758 0 00.416-.684A1 1 0 0118 7.5V10a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5a1 1 0 01.146-.508 1.758 1.758 0 00.416.684c.055-.117.122-.229.202-.332zM10 14.75a3.25 3.25 0 113.25 3.25A3.25 3.25 0 0110 14.75zM2.94 17a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm3 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm3 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm3 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM7.19 8.75h5.62a.75.75 0 010 1.5H7.19a.75.75 0 010-1.5z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <ClipLoader size={20} color="#fff" /> // Show loader when loading is true
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
