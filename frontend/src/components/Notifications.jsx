import React from 'react';

const Notifications = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 text-gray-100 flex items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-2xl font-bold mb-4'>Notifications</h2>
        <p className='text-lg mb-6'>No new notifications, we will notify you when they appear.</p>
        <button 
          onClick={() => window.history.back()} 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Notifications;
