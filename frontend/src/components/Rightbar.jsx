import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rightbar = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <aside className='w-1/4 bg-gray-800 p-6'>
            <h2 className='text-2xl font-bold mb-4'>Who to Follow</h2>
            <div className='bg-gray-700 p-4 rounded-lg shadow-md'>
                <div className='flex items-center mb-4'>
                    <img src='https://via.placeholder.com/50' alt='User' className='w-12 h-12 rounded-full mr-4' />
                    <div>
                        <p className='font-semibold'>John Doe</p>
                        <button className='mt-2 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded'>
                            Follow
                        </button>
                    </div>
                </div>
                <div className='flex items-center mb-4'>
                    <img src='https://via.placeholder.com/50' alt='User' className='w-12 h-12 rounded-full mr-4' />
                    <div>
                        <p className='font-semibold'>Jane Smith</p>
                        <button className='mt-2 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded'>
                            Follow
                        </button>
                    </div>
                </div>
                {/* Add more users as needed */}
                <button
                    onClick={Logout}
                    className="px-6 py-3 fixed bottom-10 right-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Rightbar;
