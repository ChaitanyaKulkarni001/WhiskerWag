import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import dashboardVideo from '../../StaticImages/head.mp4';
import { REFRESH_TOKEN } from '../constants';
import Lottie from 'lottie-react';
import petAnimation from '../Animation - 1726466471174.json';

const DoctorDashboard = () => {
    const [profileD, setProfileD] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    const refreshToken = async () => {
        // Existing refreshToken logic
    };

    const fetchProfile = async () => {
        try {
            const res = await api.get('/api/get_info/');
            setProfileD(res.data);
        } catch (error) {
            await refreshToken();
        }
    };

    const fetchAppointments = async () => {
        const res = await api.get('/api/appointments/');
        setAppointments(res.data);
    };

    useEffect(() => {
        fetchProfile();
        fetchAppointments();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Top: Video Header */}
            <header className="relative h-[240px] w-full text-white shadow-md flex items-center justify-center">
                <video className="absolute inset-0 w-full h-full object-cover" src={dashboardVideo} autoPlay loop muted />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold">WhiskerWag Dashboard</h1>
                    <p className="text-xl mt-2">Lab for Health Systems</p>
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </header>

            {/* Content Area */}
            <div className="flex flex-1">
                {/* Left: Lottie Animation */}
                <div className="w-[35%] bg-gradient-to-r from-blue-200 to-teal-200 flex items-center justify-center p-6">
                    <Lottie
                        animationData={petAnimation}
                        loop={true}
                        className="w-[80%] h-[80%] object-contain"
                    />
                </div>

                {/* Right: Combined Content */}
                <div className="w-[65%] bg-gray-100 p-8 overflow-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Welcome, Dr. {profileD && profileD[0].user.username}!</h2>

                    {/* Profile Section */}
                    {profileD ? (
                        <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-xl mb-8">
                            <div className="flex items-center space-x-6">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img src={profileD[0].img} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{profileD[0].user.username}</h3>
                                    <p className="mt-2 text-lg italic">{profileD[0].specialization}</p>
                                </div>
                            </div>
                            <p className="mt-4"><strong>Availability:</strong> {profileD.availability}</p>
                        </div>
                    ) : (
                        <div className="p-6 bg-white shadow-lg rounded-lg mb-8">Loading Profile...</div>
                    )}

                    {/* Appointments Section */}
                    <div className="p-6 bg-white rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-600">Appointments</h3>
                        {appointments.length > 0 ? (
                            <ul className="space-y-4">
                                {appointments.map((appointment) => (
                                    <li key={appointment.id} className="bg-gray-50 rounded-lg shadow-md p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-lg font-semibold">{appointment.user}</h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded ${appointment.status === 'Confirmed' ? 'bg-green-200' : 'bg-red-200'}`}>
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleString()}</p>
                                        <p><strong>Pet's Name:</strong> {appointment.pets_name}</p>
                                        <p><strong>Breed:</strong> {appointment.pets_breed}</p>
                                        <p><strong>Age:</strong> {appointment.pets_age}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No appointments scheduled.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="fixed bottom-4 right-4">
                <button onClick={handleLogout} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DoctorDashboard;
