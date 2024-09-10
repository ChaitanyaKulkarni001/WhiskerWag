import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <nav className={`fixed top-0 left-0 w-1/5 h-full p-6 flex flex-col justify-between ${theme === 'dim' ? 'bg-gray-800' : 'bg-white'}`}>
      <div>
        <div className='mb-8'>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>WhiskerWag</h1>
        </div>
        <ul>
          <li className='mb-6'>
            <a href="/" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>🏠</span>Home
            </a>
          </li>
          <li className='mb-6'>
            <a href="/explore" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>🔍</span>Explore
            </a>
          </li>
          <li className='mb-6'>
            <a href="/mynotifications" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>🔔</span>Notifications
            </a>
          </li>
          <li className='mb-6'>
            <a href="#" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>✉️</span>Messages
            </a>
          </li>
          <li className='mb-6'>
            <a href="/myprofile" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>👤</span>Profile
            </a>
          </li>
          <li className='mb-6'>
            <a href="/petpal/home" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>🐱</span>PetPal
            </a>
          </li>
          <li className='mb-6'>
            <a href="/takeappointment" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
              <span className='mr-4'>👨‍⚕️</span>Doctor Appointment
            </a>
          </li>
        </ul>
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Post
      </button>
    </nav>
  );
}

export default Navbar;
