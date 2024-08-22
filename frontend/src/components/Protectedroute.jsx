import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isDoc, setIsDoc] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await auth();
      } catch (error) {
        console.error(error);
        setIsAuthorized(false);
      }
    };

    authenticate();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await api.get('/api/check-doctor-status/');
      if (res.data.status === 'Doctor') {
        setIsDoc(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        setIsAuthorized(false);
        return;
      }

      const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        await auth(); // Re-authenticate after refreshing token
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
      await checkStatus(); // Check if the user is a doctor
    }
  };

  if (isAuthorized === null) {
    return <div>Loading ...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to='/login/' />;
  }

  return isDoc ? <Navigate to='/doc/' /> : children;
};

export default ProtectedRoute;
