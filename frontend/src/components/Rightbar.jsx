import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import ThemeToggleButton from './ThemeToggleButton'; // Import the toggle button

const Rightbar = () => {
    const navigate = useNavigate();
    const [imagesData, setImagesData] = useState([]);
    const { theme } = useContext(ThemeContext);

    const Logout = () => {
        localStorage.clear();
        navigate('/login');
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
    }, []);

    return (
        <aside className={`fixed top-0 right-0 w-1/4 h-full overflow-y-auto ${theme === "dim" ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4 p-6">
                <h2 className={`text-2xl font-bold mt-8 ${theme === "dim" ? "text-white" : "text-gray-800"}`}>Today's Selection</h2>
                <ThemeToggleButton /> {/* Add the toggle button here */}
            </div>

            <div id="grid" className='grid  grid-cols-2 gap-4 p-6'>
                {imagesData.map((imageData, index) => (
                    <div key={index} className='col'>
                        <img src={imageData.url} alt={`Pet ${index}`} className='rounded-lg shadow-md' />
                    </div>
                ))}
            </div>

            <button
                onClick={Logout}
                className={`px-6 py-3 fixed bottom-10 right-4 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ${theme === "dim" ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-gray-800"}`}
            >
                Logout
            </button>
        </aside>
    );
};

export default Rightbar;
