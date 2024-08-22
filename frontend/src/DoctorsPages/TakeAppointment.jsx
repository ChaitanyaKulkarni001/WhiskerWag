import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

const TakeAppointment = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [PetBreed, setPetBreed] = useState();
  const [doctor, setDoctor] = useState();
  const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().slice(0, 10)); 
  const [appointmentTime, setAppointmentTime] = useState(new Date().toTimeString().slice(0, 5)); 
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [statuses, setStatuses] = useState(["Completed","Scheduled","cancelled"])
  const [breed, setbreed] = useState()
  const [idlist ,setIdlist] = useState({})
  const [myid ,setmyid] = useState()
  useEffect(() => {
    getDoctors();
  }, []);
  const navigate = useNavigate();

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
                console.log("Refreshed token");
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
                // await fetchProfile(); // Re-fetch profile after refreshing token
                // await fetchAppointments(); // Re-fetch appointments after refreshing token
            } else {
                setIsAuthorized(false);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
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
          console.log(res.data);
          
    
          // Create a mapping of user IDs to doctor IDs
          const doctorIdMapping = doctorList.reduce((acc, doc) => {
            acc[doc.user.username] = doc.user.id  
            console.log(acc)
            
            return acc;
          }, {});
    
          setIdlist(doctorIdMapping);  // Store the mapping in state
          console.log("Id list",idlist);
          
        }
      } catch (error) {
        refreshToken();
        console.error('Failed to fetch doctors', error);
      }
    };
    

  const handleDoctorChange = (event) => {
    // event.preventDefault();
    const doctorId = event.target.value;
    console.log("doctorId is ",{doctorId});
    
    setDoctor(doctorId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Fetch the doctor ID from the idlist mapping
    const selectedDoctorId = idlist[doctor];
  console.log("selected id is ",selectedDoctorId)
  
    const appointmentData = {
      pets_name: `${petName}`,
      pets_age:  `${petAge}`,
      pets_breed: `${breed}`,
      doctor: doctor,  // Use the correct doctor ID here
      appointment_date: `${appointmentDate}T${appointmentTime}:00`,
      status: `${status}` || 'Scheduled',  // Default status to 'Scheduled'
      // note: note,
    };
    console.log(appointmentData);
    
    try {
      const response = await api.post('/api/appointments/', appointmentData);
      if (response.status === 201) {
        console.log('Appointment created successfully:', response.data);
        alert('Appointment requested successfully')
        navigate('/');  // Redirect to a different page or show a success message
      } else {
        console.log(appointmentData);
        console.error('Failed to create appointment:', response.data);
      }
    } catch (error) {
      console.error('Error while creating appointment:', error);
    }
  };
  
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl">
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
              id="petbread"
              value={breed}
              onChange={(e) =>  setbreed(e.target.value)}
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
                <option key={doc.user.id} value={doc.id}>{doc.user.username}</option>
              ))}
            </select>
          </div>

          {/* Display Doctor's Availability and Specialization */}
          {selectedDoctor && (
            <div className="space-y-2">
              <div>
                <strong>Availability:</strong> {selectedDoctor.availability}
              </div>
              <div>
                <strong>Specialization:</strong> {selectedDoctor.specialization}
              </div>
            </div>
          )}

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
              className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              rows="3"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              id="status"
              value={status}
              // onChange={(e) => setStatus(e.target.value)}
              onChange={(e) => setStatus('Scheduled')}
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
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md shadow-lg hover:from-blue-600 hover:to-teal-500 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TakeAppointment;
