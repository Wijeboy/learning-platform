import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuth, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Search functionality will be implemented later
      console.log('Searching for:', searchQuery);
      // You can add search logic here or pass to parent component
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <img src="/learnx logo.png" alt="LearnX Logo" className="logo-image" />
          <span className="navbar-home">Home</span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <FiSearch className="search-icon" />
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>

        {/* Cart and Profile Icons */}
        <div className="navbar-icons">
          <Link to="/cart" className="icon-link">
            <FiShoppingCart className="nav-icon" />
          </Link>
          {isAuth ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user?.firstName}</span>
              <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
            </div>
          ) : (
            <Link to="/login" className="icon-link">
              <FiUser className="nav-icon" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;