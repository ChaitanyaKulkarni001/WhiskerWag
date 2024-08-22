import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 text-white">
      <h1 className="text-9xl font-extrabold mb-8">404</h1>
      <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="py-3 px-6 bg-white text-red-500 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
