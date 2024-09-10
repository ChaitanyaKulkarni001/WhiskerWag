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
      const res = await api.get('/api/userinformation/');
      const profileData = res.data[0];
      setProfile(profileData);
      setFormData({
        gender: profileData.gender,
        age: profileData.age,
        pet: {
          breed: profileData.pet_breed,
          name: profileData.pet_name,
          favoriteFood: profileData.pet_favorite_food
        },
        img: profileData.img
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
      await api.put('/api/userinformation/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
      fetchProfile(); // Re-fetch profile to get updated data
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="relative">
          <img
            src={profile?.img ? profile.img : "/default-profile.png"}
            alt="Profile"
            className="w-full h-48 object-cover"
          />
          <img
            src={profile?.img ? profile.img : "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4"
          />
        </div>
        <div className="p-6">
          {profile ? (
            <>
              <div className="mt-16">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Pet Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600"><span className="font-semibold">Breed:</span> {profile.pet_breed}</p>
                  <p className="text-gray-600 mt-1"><span className="font-semibold">Name:</span> {profile.pet_name}</p>
                  <p className="text-gray-600 mt-1"><span className="font-semibold">Favorite Food:</span> {profile.pet_favorite_food}</p>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-2 text-gray-800">User Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600"><span className="font-semibold">Name:</span> {profile.name}</p>
                  <p className="text-gray-600 mt-1"><span className="font-semibold">Email:</span> {profile.email}</p>
                  <p className="text-gray-600 mt-1"><span className="font-semibold">Gender:</span> {profile.gender}</p>
                  <p className="text-gray-600 mt-1"><span className="font-semibold">Age:</span> {profile.age}</p>
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
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
