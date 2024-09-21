import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Assuming this is the correct path to your ThemeContext

const Notifications = () => {
  const { theme } = useContext(ThemeContext);
  
  // Dynamically set classes based on the theme
  const bgClass = theme === 'dim' 
    ? 'bg-gray-800 text-gray-100' // Dark theme
    : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900'; // Light theme gradient
  const buttonClass = theme === 'dim' 
    ? 'bg-blue-500 hover:bg-blue-700 text-white' // Dark theme button
    : 'bg-purple-500 hover:bg-purple-700 text-gray-100'; // Light theme button

  return (
    <div className={`fixed top-0 left-0 w-full h-full ${bgClass} flex items-center justify-center`}>
      <div className={`p-8 rounded-lg shadow-lg w-1/3 ${theme === 'dim' ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className='text-2xl font-bold mb-4'>Notifications</h2>
        <p className='text-lg mb-6'>No new notifications, we will notify you when they appear.</p>
        <button 
          onClick={() => window.history.back()} 
          className={`${buttonClass} font-bold py-2 px-4 rounded`}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Notifications;
