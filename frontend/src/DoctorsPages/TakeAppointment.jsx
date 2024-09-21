import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import Lottie from 'lottie-react';
import petAnimation from '../Animation - 1726290566989.json';

const TakeAppointment = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const theme = useContext(ThemeContext);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [breed, setBreed] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().slice(0, 10));
  const [appointmentTime, setAppointmentTime] = useState(new Date().toTimeString().slice(0, 5));
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [statuses, setStatuses] = useState(["Completed", "Scheduled", "Cancelled"]);
  const [idList, setIdList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors();
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        setIsAuthorized(false);
        navigate('/login');
        return;
      }

      const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        navigate('/login');
      }
    } catch (error) {
      setIsAuthorized(false);
      navigate('/login');
    }
  };

  const getDoctors = async () => {
    try {
      const res = await api.get('/api/get_doc/');
      if (res.status === 200) {
        const doctorList = res.data;
        setDoctors(doctorList);

        const doctorIdMapping = doctorList.reduce((acc, doc) => {
          acc[doc.user.username] = doc.user.id;
          return acc;
        }, {});

        setIdList(doctorIdMapping);
      }
    } catch (error) {
      refreshToken();
    }
  };

  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedDoctorId = idList[doctor];

    const appointmentData = {
      pets_name: petName,
      pets_age: petAge,
      pets_breed: breed,
      doctor: selectedDoctorId,
      appointment_date: `${appointmentDate}T${appointmentTime}:00`,
      status: status || 'Scheduled',
    };

    try {
      const response = await api.post('/api/appointments/', appointmentData);
      if (response.status === 201) {
        alert('Appointment requested successfully');
        navigate('/');
      } else {
        console.error('Failed to create appointment:', response.data);
      }
    } catch (error) {
      console.error('Error while creating appointment:', error);
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === "dim" ? 'bg-black' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
      
      <div className="flex flex-1">
        
        <div className="w-full md:w-1/2 p-8">
        <button 
        onClick={() => window.history.back()} 
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 mt-2 px-4 rounded mb-6"
      >
        Go Back
      </button> 
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Request an Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet's Name:</label>
              <input
                type="text"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="petAge" className="block text-sm font-medium text-gray-700">Pet's Age:</label>
              <input
                type="number"
                id="petAge"
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700">Pet's Breed:</label>
              <input
                type="text"
                id="petBreed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor:</label>
              <select
                id="doctor"
                value={doctor}
                onChange={handleDoctorChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.user.id} value={doc.user.username}>{doc.user.username}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date:</label>
              <input
                type="date"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Time:</label>
              <input
                type="time"
                id="appointmentTime"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">Specify the problem:</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
                rows="3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              >
                <option value="">Select status</option>
                {statuses.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>{statusOption}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-teal-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Appointment
            </button>
          </form>
        </div>
        <Lottie animationData={petAnimation} loop={true} className="fixed right-0 top-0 w-1/2 h-full object-cover" />
      </div>
    </div>
  );
};

export default TakeAppointment;
