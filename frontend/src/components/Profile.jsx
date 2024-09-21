import React, { useEffect, useState } from 'react';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import Lottie from 'lottie-react';
import petAnimation from '../Animation - 1726208191522.json';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/');
  };

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    pet: {
      breed: '',
      name: '',
      favoriteFood: ''
    },
    img: null
  });

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) return;

      const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        await fetchProfile();
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get('/api/profile/');
      setProfile(res.data);
      setFormData({
        gender: res.data.gender,
        age: res.data.age,
        pet: {
          breed: res.data.pet_breed,
          name: res.data.pet_name,
          favoriteFood: res.data.pet_favorite_food
        },
        img: res.data.img
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      await refreshToken();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      pet: {
        ...prevState.pet,
        [name]: value
      }
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      img: e.target.files[0]
    }));
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('pet_breed', formData.pet.breed);
    formDataToSend.append('pet_name', formData.pet.name);
    formDataToSend.append('pet_favorite_food', formData.pet.favoriteFood);
    if (formData.img) {
      formDataToSend.append('img', formData.img);
    }

    try {
      await api.put('/api/profile/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
// {/* <div className={`min-h-screen ${theme === 'dim' ? 'bg-gray-800' : 'bg-gradient-to-r from-pink-500 to-orange-400'} flex flex-col px-4`}>
//       {/* Go Back button */}
//       <button 
//         onClick={() => navigate('/')}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded mb-6"
//       >
//         Go Back
//       </button> 

//       {/* Animation Section */}
//       <Lottie 
//         animationData={petAnimation} 
//         loop={true} 
//         className="w-full h-[300px] mb-6 md:hidden" 
//       />

//       {/* Profile Content */}
//       <div className="flex flex-col md:flex-row bg-gradient-to-r from-orange-500 to-purple-600 shadow-2xl rounded-lg overflow-hidden p-4 md:p-6">
//         <div className="relative md:w-1/2"></div> */}
  return (
    // 
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-purple-800 to-blue-600 p-4">
      <div className={`relative ${profile ? 'md:w-1/2' : 'w-full'} flex items-center justify-center`}>
        <Lottie 
          animationData={petAnimation} 
          loop={true} 
          className={`w-640 h-640 ${profile ? 'top-0 ' : 'top-0'}`} 
        />
        <button 
          onClick={handleBackClick} 
          className='bg-blue-500 fixed hover:bg-blue-700 text-white font-bold py-2 px-4 bottom-6 left-6 rounded'
        >
          Go Back
        </button>
      </div>
      <div className={`md:w-1/2 bg-gradient-to-r from-orange-500 to-purple-600 shadow-2xl rounded-lg overflow-hidden p-4 md:p-6 ${profile ? 'mt-0' : 'mt-10'}`}>
        <div className="relative">
          <img
            src={profile?.img ? `https://whiskerwag-backend.onrender.com/${profile.img}` : "/default-profile.png"}
            alt="Profile"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <img
            src={profile?.img ? `https://whiskerwag-backend.onrender.com/${profile.img}` : "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4"
          />
        </div>
        <div className="mt-16">
          {profile ? (
            <>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-2 text-white">Pet Information</h2>
                <div className="p-6 rounded-lg border border-gray-300">
                  <h3 className="text-2xl font-semibold text-white mb-6">Pet Details</h3>
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Breed:</span>
                    <p className="text-white text-lg">{profile.pet_breed}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Name:</span>
                    <p className="text-white text-lg">{profile.pet_name}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-white text-lg w-1/3">Favorite Food:</span>
                    <p className="text-white text-lg">{profile.pet_favorite_food}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-2 text-white">User Information</h2>
                <div className="p-4 rounded-lg border border-gray-300">
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Name:</span>
                    <p className="text-white text-lg">{profile.username}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Email:</span>
                    <p className="text-white text-lg">{profile.email}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Gender:</span>
                    <p className="text-white text-lg">{profile.gender}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="font-semibold text-white text-lg w-1/3">Age:</span>
                    <p className="text-white text-lg">{profile.age}</p>
                  </div>
                </div>
              </div>
              <button 
                className="mt-6 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
                onClick={handleUpdateClick}
              >
                Update Profile
              </button>

              {isEditing && (
                <form className="mt-8" onSubmit={handleSaveClick}>
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Gender</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-black"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Not to specify">Not to specify</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Age</label>
                    <input 
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your age"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Breed</label>
                    <input 
                      type="text"
                      name="breed"
                      value={formData.pet.breed}
                      onChange={handlePetChange}
                      className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your pet's breed"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.pet.name}
                      onChange={handlePetChange}
                      className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your pet's name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Favorite Food</label>
                    <input 
                      type="text"
                      name="favoriteFood"
                      value={formData.pet.favoriteFood}
                      onChange={handlePetChange}
                      className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your pet's favorite food"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Profile Image</label>
                    <input 
                      type="file"
                      name="img"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </>
          ) : (
            <p className="text-white text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
