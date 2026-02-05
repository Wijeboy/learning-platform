import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 5L5 10V20L15 25L25 20V10L15 5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="15" cy="15" r="3" fill="currentColor"/>
            </svg>
          </div>
          <span className="logo-text">LEARNX</span>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span>Categories ▼</span>
          </li>
          <li>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search For Course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </form>
          </li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>

        <Link to="/login" className="login-btn">LOGIN</Link>
      </div>
    </nav>
  );
};

export default Navbar;
