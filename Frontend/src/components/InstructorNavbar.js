import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiBook, FiUsers, FiBarChart2, FiUser, FiLogOut, FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './InstructorNavbar.css';

const InstructorNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="instructor-navbar">
      <div className="instructor-navbar-container">
        {/* Logo Section */}
        <Link to="/instructor/dashboard" className="instructor-navbar-logo">
          <img src="/learnx logo.png" alt="LearnX Logo" className="instructor-logo-image" />
          <span className="instructor-brand">Instructor Portal</span>
        </Link>

        {/* Navigation Links */}
        <div className="instructor-navbar-links">
          <Link to="/instructor/dashboard" className="instructor-nav-link">
            <FiHome className="nav-link-icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/instructor/courses" className="instructor-nav-link">
            <FiBook className="nav-link-icon" />
            <span>My Courses</span>
          </Link>
          <Link to="/instructor/students" className="instructor-nav-link">
            <FiUsers className="nav-link-icon" />
            <span>Students</span>
          </Link>
          <Link to="/instructor/analytics" className="instructor-nav-link">
            <FiBarChart2 className="nav-link-icon" />
            <span>Analytics</span>
          </Link>
          <Link to="/instructor/profile" className="instructor-nav-link">
            <FiUser className="nav-link-icon" />
            <span>Profile</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="instructor-navbar-actions">
          <Link to="/instructor/courses/add" className="btn-create-course-nav">
            <FiPlus className="plus-icon" />
            <span>Create Course</span>
          </Link>
          
          <div className="instructor-user-menu">
            <div className="instructor-user-info">
              {user?.profilePhoto ? (
                <img 
                  src={`http://localhost:5001${user.profilePhoto}`} 
                  alt="Profile" 
                  className="instructor-avatar"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                  }}
                />
              ) : (
                <div className="instructor-avatar">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="instructor-user-name">{user?.firstName} {user?.lastName}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InstructorNavbar;
