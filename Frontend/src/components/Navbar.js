import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuth, user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getDashboardLink = () => {
    if (user?.userType === 'student') return '/student/dashboard';
    if (user?.userType === 'instructor') return '/instructor/dashboard';
    if (user?.userType === 'admin') return '/admin/dashboard';
    return '/';
  };

  const getProfileLink = () => {
    if (user?.userType === 'student') return '/student/profile';
    if (user?.userType === 'instructor') return '/instructor/profile';
    if (user?.userType === 'admin') return '/admin/profile';
    return '/';
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
          <Link to="/ShopPage" className="nav-link">Shop</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>

        {/* Cart and Profile Icons */}
        <div className="navbar-icons">
          <Link to="/cart" className="icon-link">
            <FiShoppingCart className="nav-icon" />
          </Link>
          {isAuth ? (
            <div className="user-menu" ref={dropdownRef}>
              <div className="user-info" onClick={toggleDropdown}>
                {user?.profilePhoto ? (
                  <img 
                    src={`http://localhost:5001${user.profilePhoto}`} 
                    alt="Profile" 
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    <FiUser />
                  </div>
                )}
                <span className="user-name">Hi, {user?.firstName}</span>
                <FiChevronDown className={`dropdown-icon ${showDropdown ? 'rotate' : ''}`} />
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link 
                    to={getDashboardLink()} 
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to={getProfileLink()} 
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    Logout
                  </button>
                </div>
              )}
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