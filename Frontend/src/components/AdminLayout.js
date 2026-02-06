import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiUsers, FiUserCheck, FiShield, FiUserPlus, FiLogOut } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/profile', icon: <FiShield />, label: 'My Profile' },
    { path: '/admin/manage-students', icon: <FiUsers />, label: 'Students' },
    { path: '/admin/manage-instructors', icon: <FiUserCheck />, label: 'Instructors' },
    { path: '/admin/manage-admins', icon: <FiShield />, label: 'Admins' },
    { path: '/admin/create-instructor', icon: <FiUserPlus />, label: 'Add Instructor' },
    { path: '/admin/create-admin', icon: <FiUserPlus />, label: 'Add Admin' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">LX</div>
            <span>LearnX Admin</span>
          </div>
        </div>

        <div className="admin-profile">
          <div className="profile-avatar">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" />
            ) : (
              <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
            )}
          </div>
          <div className="profile-info">
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>{user?.role || 'Admin'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
