import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import dashboardVideo from '../../StaticImages/head.mp4'; // Replace with the actual path
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

const DoctorDashboard = () => {
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [profileD, setProfileD] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [logo, setLogo] = useState(null); // State to store the logo image
    const navigate = useNavigate();

    const refreshToken = async () => {
        // Existing refreshToken logic
    };

    const fetchProfile = async () => {
        try {
            const res = await api.get('/api/get_info/');
            setProfileD(res.data);

            console.log(res.data)
            
            if (res.data[0].logo) {
                setLogo(res.data[0].logo); // Set logo if available in profile data
            }
        } catch (error) {
            await refreshToken();
            console.error('Error fetching profile:', error);
        }
    };

    const fetchAppointments = async () => {
        // Existing fetchAppointments logic
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file)); // Preview the selected image
            uploadLogo(file); // Call the function to upload the file
        }
    };

    const uploadLogo = async (file) => {
        const formData = new FormData();
        formData.append('logo', file);

        try {
            const res = await api.put('/api/update_profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 200) {
                console.log('Logo uploaded successfully');
                setProfileD(res.data[0]); // Update profile data with the new logo
            }
        } catch (error) {
            console.error('Error uploading logo:', error);
            await refreshToken();
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchAppointments();
    }, []);

    const handleLogout = () => {
        // Existing handleLogout logic
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <div className="p-6 bg-white shadow rounded-lg">Welcome to your dashboard, Dr. {profileD && profileD[0].user.username}!</div>;
            case 'profile':
                return profileD ? (<div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl rounded-2xl max-w-md mx-auto text-white transform transition duration-500 hover:scale-105">
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img src={profileD[0].img} alt="Profile" className="w-full h-full object-cover" />
                            <span className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-xs text-white font-semibold uppercase tracking-wide opacity-0 hover:opacity-100 transition duration-300">
                                View Profile
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold leading-tight">{profileD[0].user.username}</h3>
                            <p className="mt-2 text-lg italic text-gray-200">{profileD[0].specialization}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm"><strong>Availability:</strong> {profileD.availability}</p>
                    </div>
                </div>
                
                ) : (
                    <div className="p-6 bg-white shadow rounded-lg">Loading Profile...</div>
                );
            case 'appointments':
                return (
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Appointments</h3>
                        {appointments.length > 0 ? (
                            <ul className="space-y-4">
                                {appointments.map((appointment) => (
                                    <li
                                        key={appointment.id}
                                        className="bg-gray-400 rounded-lg shadow-md overflow-hidden flex flex-col p-4"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-medium text-gray-100">{appointment.user}</h3>
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <p className="text-gray-200">
                                                <span className="font-medium">Date:</span> {new Date(appointment.appointment_date).toLocaleString()}
                                            </p>
                                            <p className="text-gray-100">
                                                <span className="font-medium">Pet's Name:</span> {appointment.pets_name}
                                            </p>
                                            <div className="flex space-x-2">
                                                <p className="text-gray-100">
                                                    <span className="font-medium">Breed:</span> {appointment.pets_breed}
                                                </p>
                                                <p className="text-gray-100">
                                                    <span className="font-medium">Age:</span> {appointment.pets_age}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No appointments scheduled.</p>
                        )}
                    </div>
                );
            default:
                return <div className="p-6 bg-white shadow rounded-lg">Select a Section</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="relative h-[240px] text-white shadow-md flex items-center justify-center">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={dashboardVideo}
                    autoPlay
                    loop
                    muted
                />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold">WhiskerWag Dashboard</h1>
                    <p className="text-xl mt-2">Lab for Health Systems</p>
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </header>
            <div className="flex">
                <nav className="w-64 bg-gray-800 text-white p-4 space-y-4">
                    <button
                        onClick={() => setActiveSection('dashboard')}
                        className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-700'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveSection('profile')}
                        className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'profile' ? 'bg-blue-600' : 'hover:bg-blue-700'}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveSection('appointments')}
                        className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'appointments' ? 'bg-blue-600' : 'hover:bg-blue-700'}`}
                    >
                        Appointments
                    </button>
                </nav>
                <main className="flex-1 p-6">
                    {renderContent()}
                </main>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 fixed right-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
