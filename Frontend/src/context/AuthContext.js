import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as logoutService, isAuthenticated, getStoredUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();

  const INACTIVITY_TIMEOUT = 60000; // 1 minute in milliseconds

  // Initialize auth state
  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = getStoredUser();
      setUser(storedUser);
      setIsAuth(true);
    }
  }, []);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    // Activity events to track
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, updateActivity);
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, []);

  // Check for inactivity
  useEffect(() => {
    if (!isAuth) return;

    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;

      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        logout();
        alert('You have been logged out due to inactivity');
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkInactivity);
  }, [isAuth, lastActivity]);

  const login = (userData) => {
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    
    setUser(userData);
    setIsAuth(true);
    setLastActivity(Date.now());
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, lastActivity }}>
      {children}
    </AuthContext.Provider>
  );
};
