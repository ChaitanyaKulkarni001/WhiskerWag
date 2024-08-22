import React from 'react';
import { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

const Form = ({ route, method }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const heading = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        console.log("res.data,",res.data);
        
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        // console.log('Access Token:', localStorage.getItem(ACCESS_TOKEN));
        // console.log('Refresh Token:', localStorage.getItem(REFRESH_TOKEN));
        // console.log("navigated to /");
        
        navigate(`/`);
      } else {
        navigate('/login');
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {heading}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : heading}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
