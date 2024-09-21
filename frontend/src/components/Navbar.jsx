  import React, { useContext, useState } from 'react';
  import { ThemeContext } from '../ThemeContext';
 

  const Navbar = ({ setShowForm, showForm }) => {
    const { theme } = useContext(ThemeContext);
    const [post, setPost] = useState();
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false); // Mobile navbar toggle state

    // Conditional class for background based on the theme
    const bgClass = theme === 'dim' 
      ? 'bg-gray-800'  // Dark theme background
      : 'bg-gradient-to-r from-pink-500 to-orange-400';  // Light theme gradient background

    // Toggle the mobile navbar
    

    return (
      <div className={` fixed  ${bgClass}`} >
    <nav
      className={`lg:static top-0 left-0 z-20 w-full lg:w-1/5 lg:h-screen h-full p-6 flex flex-col justify-between transition-transform duration-300
        `}
    >
      <div className="flex justify-between mb-8">
            <h1 className="text-2xl font-bold mr-[114px]">
              WhiskerWag
            </h1>
            {/* Close button inside the navbar (for mobile view) */}
            
          </div>
          
          <ul className="flex-grow">
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
            {/* <li className='mb-6'>
              <a href="#" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
                <span className='mr-4'>✉️</span>Messages
              </a>
            </li> */}
            <li className='mb-6'>
              <a href="/myprofile" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
                <span className='mr-4'>👨🏻‍🦳</span>Profile
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
            <li className='mb-6'>
              <a href="/feedback" className={`flex items-center text-xl hover:text-blue-500 ${theme === 'dim' ? 'text-white' : 'text-gray-800'}`}>
                <span className='mr-4'>📱</span>Feedback
              </a>
            </li>
          </ul>

          
          {/* <button>HELLo word</button> */}
        </nav>

        {/* Overlay when mobile navbar is visible */}
        
        
      </div>
    );
  };

  export default Navbar;
