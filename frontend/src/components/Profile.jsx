import React, { useEffect, useState } from 'react';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    pet: {
      breed: '',
      name: '',
      favoriteFood: ''
    }
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
      const res = await api.get('/api/get_user/');
      setProfile(res.data[0]);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      await refreshToken();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const isDoc = () => (profile?.is_doc ? "Doctor" : "User");

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

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await api.put('/api/profile/', {
        gender: formData.gender,
        age: formData.age,
        pet_breed: formData.pet.breed,
        pet_name: formData.pet.name,
        pet_favorite_food: formData.pet.favorite_food
      });
      setIsEditing(false);
      fetchProfile(); // Re-fetch profile to get updated data
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  

  return (
    <div className='bg-gradient-to-r from-purple-700 to-blue-500 min-h-screen flex items-center justify-center'>
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-4 mx-auto" /> 
        {profile ? (
          <>
            <h1 className="text-3xl font-bold text-center">{profile.username}</h1>
            <h2 className="mt-2 text-lg text-center text-gray-600">{isDoc()}</h2>
            <button 
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleUpdateClick}
            >
              Update Profile
            </button>

            {isEditing && (
              <form className="mt-8">
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Age</label>
                  <input 
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your age"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Pet Information</h3>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Breed</label>
                  <input 
                    type="text"
                    name="breed"
                    value={formData.pet.breed}
                    onChange={handlePetChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your pet's breed"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.pet.name}
                    onChange={handlePetChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your pet's name"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Favorite Food</label>
                  <input 
                    type="text"
                    name="favoriteFood"
                    value={formData.pet.favoriteFood}
                    onChange={handlePetChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your pet's favorite food"
                  />
                </div>
                <button 
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
