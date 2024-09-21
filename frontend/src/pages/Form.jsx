import React, { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import petAnimation from '../Animation - 1726211806821.json';

const Alert = ({ message, type }) => {
  return (
    <div
      className={`p-4 mb-4 text-sm ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-lg`}
      role="alert"
    >
      {message}
    </div>
  );
};

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
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const heading = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

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
        navigate('/login');
      } else {
        const loginData = { username, password };
        const res = await api.post(route, loginData);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      let errorMessage = "Some error occurred ";
      if (e.message === "Network Error") {
        errorMessage = "Please check your Internet connection";
      }
      if (e.message === "Request failed with status code 401") {
        errorMessage = "Invalid username or password";
      }
      setAlert({
        type: 'error',
        message: `Oops! ${errorMessage}!`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-600 to-blue-700">
      <div className="hidden md:block md:w-1/2 flex items-center justify-center">
        <Lottie animationData={petAnimation} loop={true} className="w-640 h-640" />
      </div>

      <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center">
        {/* Lottie Animation on Top for Mobile View */}
        <div className="md:hidden w-full flex items-center justify-center mb-4">
          <Lottie animationData={petAnimation} loop={true} className="w-96 h-96" />
        </div>

        <div className="md:w-1/2 w-full items-center justify-center">
          <div className="bg-transparent text-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-2">{heading}</h1>
            {alert && <Alert message={alert.message} type={alert.type} />}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
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
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
                    <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium">Age</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      min="16"
                      className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pet_breed" className="block text-sm font-medium">Pet Breed</label>
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
                    <label htmlFor="pet_name" className="block text-sm font-medium">Pet Name</label>
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
                    <label htmlFor="pet_favorite_food" className="block text-sm font-medium">Pet's Favorite Food</label>
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
                    <label htmlFor="img" className="block text-sm font-medium">Profile Picture</label>
                    <input
                      type="file"
                      name="img"
                      id="img"
                      accept="image/*"
                      onChange={(e) => setImg(e.target.files[0])}
                      className="mt-1 block w-full text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? 'Processing...' : heading}
              </button>
            </form>

            {method === 'login' && (
              <>
              <div className="mt-4 text-center text-sm">
                <p>
                  Don't have an account?{' '}
                  <a href="/register" className="text-blue-400 hover:underline">
                    Register here
                  </a>
                </p>
              </div>
              <div className="text-center mt-6">
                <h1 className="text-4xl font-extrabold leading-tight text-white">WhiskerWag</h1>
                <p className="font-extrabold text-white">
                  For Paws, Whiskers, and Wagging Tails...
                </p>
              </div>
            </>
            
            )}
          </div>
        </div>

        {/* Title and Subtitle at the Bottom for Mobile View */}
        {/* {method === "login" && (
          <div className="absolute bottom-20 right-[50%] p-4 text-right">
          <h1 className="text-7xl font-extrabold text-white leading-tight  ">WhiskerWag</h1>
          <p className="font-extrabold text-white">For Paws, Whiskers, and Wagging Tails...</p>
        </div>
        )} */}
      </div>
    </div>
  );
};

export default Form;
