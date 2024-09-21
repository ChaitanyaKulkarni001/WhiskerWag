import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import ThemeToggleButton from './ThemeToggleButton'; // Import the toggle button
import api from '../api'; // Import your API module
import { ACCESS_TOKEN } from '../constants'; // Import your constants

const Rightbar = () => {
    const navigate = useNavigate();
    const [imagesData, setImagesData] = useState([]);
    const [user, setUser] = useState(null);
    const { theme } = useContext(ThemeContext);

    const Logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const fetchUserProfile = async () => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) return;

            const response = await api.get('/api/profile/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Replace with your API URLs
                    const urlCat = `https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_qMpYKmh6cnYPrWXVUUqv7vqS8ZjjUFg3D7mh7qucVHIqOFVvuhLE1LRJpOQkguMX`; 
                    const urlDog = `https://api.thedogapi.com/v1/images/search?limit=5&api_key=live_Ap1CsxldmODVT6dMyZZ35fqV7Cesh0u8IseqeIJjFKxLhHo7TwbUwLH3ABmxKuvh`;

                const responseCat = await fetch(urlCat);
                const responseDog = await fetch(urlDog);

                const dataCat = await responseCat.json();
                const dataDog = await responseDog.json();

                setImagesData([...dataCat, ...dataDog]); 
            } catch (error) {
                console.log("Error fetching images:", error);
            }
        };

        fetchImages();
        fetchUserProfile(); // Fetch user profile when component mounts
    }, []);

    return (
<aside
  className={`fixed lg:static top-0 right-0 w-[100%] lg:w-[23%] h-full overflow-y-hidden ${theme === 'dim' ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-400 to-purple-600'}`}
>
  <div className="flex justify-between items-center p-4">
    <div className="p-2 mr-4">
      {user && (
        <div className="flex items-center mb-6">
          <img 
            src={user.img ? `https://whiskerwag-backend.onrender.com/${user.img}` : "/default-profile.png"}
            alt="User"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
          <div className="ml-3">
            <p className="text-xl font-semibold text-white">{user.username}</p>
            <p className="text-md text-gray-300">{user.email}</p>
          </div>
        </div>
      )}
    </div>
    <div className='mb-6 ml-4'>
      <ThemeToggleButton /> {/* Add the toggle button here */}
    </div>
  </div>

  <h2 className={`text-4xl font-bold ${theme === "dim" ? "text-white" : "text-gray-800"}`}>Today's Selection</h2>

  <div className='overflow-y-auto h-[calc(100%_-_120px)] p-6'>
    <div id="grid" className='grid grid-cols-2 gap-4'>
      {imagesData.map((imageData, index) => (
        <div key={index} className='col'>
          <img src={imageData.url} alt={`Pet ${index}`} className='rounded-lg shadow-md' />
        </div>
      ))}
    </div>
  </div>

  <button
    onClick={Logout}
    className={`px-6 py-3 fixed bottom-10 right-4 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ${theme === "dim" ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-gradient-to-r from-teal-500 to-blue-400"}`}
  >
    Logout
  </button>
</aside>
);
};

export default Rightbar;
