import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // Construct the full URL
    console.log(token);
    
    const fullURL = `${config.baseURL || ''}${config.url}`;
    console.log('Full URL:', fullURL);
    // console.log();
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default api;
