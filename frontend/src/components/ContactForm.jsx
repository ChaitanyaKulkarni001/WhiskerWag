import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router
import api from '../api';
import { ThemeContext } from '../ThemeContext';

const ContactForm = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();  // For navigating back
  const bgClass = theme === 'dim' 
    ? 'bg-gray-800'  // Dark theme background
    : 'bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    api.post('/api/send-email/', formData)
      .then(response => {
        alert('Email sent successfully!');
      })
      .catch(error => {
        alert('Failed to send email.');
      });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center ${bgClass}`}>
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
      >
        Back
      </button>

      <div className="w-full max-w-lg p-8 bg-transparent rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Share Your Views</h2>

        {/* Note about doctor registration */}
        <div className={`mb-6 p-4  ${theme=="dim"?'bg-black':'bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600'}  rounded-md shadow-md`}>
          <p className="text-lg mb-4 text-white">
            If you are a Doctor and  wishing to register as a doctor on WhiskerWag, Mension this to gain access to the WhiskerWag Dashboard
            to manage pets queries and appointments  the process involves initial admin authentication. 
            After successful verification, you will gain access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-lg mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Share your thoughts"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-4 bg-indigo-700 hover:bg-indigo-800 text-white text-lg font-bold rounded-lg transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
