import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './GuestNavbar.css';

const GuestNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="guest-navbar">
      <div className="guest-navbar-container">
        {/* Logo Section */}
        <Link to="/" className="guest-navbar-logo">
          <img src="/learnx logo.png" alt="LearnX Logo" className="guest-logo-image" />
          <span className="guest-navbar-home">Home</span>
        </Link>

        {/* Search Bar */}
        <div className="guest-navbar-search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="guest-search-input"
          />
          <button onClick={handleSearch} className="guest-search-button">
            <FiSearch className="guest-search-icon" />
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <div className="guest-navbar-links">
          <Link to="/courses" className="guest-nav-link">Courses</Link>
          <Link to="/events" className="guest-nav-link">Events</Link>
          <Link to="/shop" className="guest-nav-link">Shop</Link>
          <Link to="/blog" className="guest-nav-link">Blog</Link>
        </div>

        {/* Get Started Button */}
        <div className="guest-navbar-button">
          <Link to="/signup" className="btn-get-started">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;