import React, { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

const Form = ({ route, method }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petName, setPetName] = useState('');
  const [petFavoriteFood, setPetFavoriteFood] = useState('');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const heading = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === 'register') {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('pet_breed', petBreed);
        formData.append('pet_name', petName);
        formData.append('pet_favorite_food', petFavoriteFood);
        if (img) {
          formData.append('img', img);
        }

        await api.post('/api/userinformation/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const loginData = { username, password };
        const res = await api.post(route, loginData);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate(`/`);
      } else {
        const loginData = { username, password };
        const res = await api.post(route, loginData);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate(`/`);
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          {heading}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {method === 'register' && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter your gender"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pet_breed" className="block text-sm font-medium">
                  Pet Breed
                </label>
                <input
                  type="text"
                  name="pet_breed"
                  id="pet_breed"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  placeholder="Enter your pet's breed"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pet_name" className="block text-sm font-medium">
                  Pet Name
                </label>
                <input
                  type="text"
                  name="pet_name"
                  id="pet_name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter your pet's name"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pet_favorite_food" className="block text-sm font-medium">
                  Pet's Favorite Food
                </label>
                <input
                  type="text"
                  name="pet_favorite_food"
                  id="pet_favorite_food"
                  value={petFavoriteFood}
                  onChange={(e) => setPetFavoriteFood(e.target.value)}
                  placeholder="Enter your pet's favorite food"
                  className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="img" className="block text-sm font-medium">
                  Image
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="mt-1 block w-full border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-semibold text-gray-900 ${loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : heading}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
