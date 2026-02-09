import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers } from '../../services/adminService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    instructors: 0,
    admins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!isAuth || user?.userType !== 'admin') {
      navigate('/login');
      return;
    }

    fetchStats();
  }, [isAuth, user, navigate]);

  const fetchStats = async () => {
    try {
      const response = await getAllUsers();
      setStats({
        students: response.data.students.length,
        instructors: response.data.instructors.length,
        admins: response.data.admins.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, {user?.firstName}! Here's what's happening today.</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-box student-stat">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-details">
            <h2>{stats.students}</h2>
            <p>Total Students</p>
            <button onClick={() => navigate('/admin/manage-students')}>View All →</button>
          </div>
        </div>

        <div className="stat-box instructor-stat">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-details">
            <h2>{stats.instructors}</h2>
            <p>Total Instructors</p>
            <button onClick={() => navigate('/admin/manage-instructors')}>View All →</button>
          </div>
        </div>

        <div className="stat-box admin-stat">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="stat-details">
            <h2>{stats.admins}</h2>
            <p>Total Admins</p>
            <button onClick={() => navigate('/admin/manage-admins')}>View All →</button>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card" onClick={() => navigate('/admin/create-instructor')}>
            <div className="action-icon add">+</div>
            <h3>Add New Instructor</h3>
            <p>Create a new instructor account</p>
          </div>

          <div className="action-card" onClick={() => navigate('/admin/create-admin')}>
            <div className="action-icon add">+</div>
            <h3>Add New Admin</h3>
            <p>Create a new admin account</p>
          </div>

          <div className="action-card" onClick={() => navigate('/admin/manage-students')}>
            <div className="action-icon view">👁</div>
            <h3>Manage Students</h3>
            <p>View and manage all students</p>
          </div>

          <div className="action-card" onClick={() => navigate('/admin/manage-instructors')}>
            <div className="action-icon view">⚙️</div>
            <h3>Manage Instructors</h3>
            <p>View and manage all instructors</p>
          </div>

          <div className="action-card" onClick={() => navigate('/admin/manage-products')}>
            <div className="action-icon view">📦</div>
            <h3>Manage Products</h3>
            <p>View and manage all shop products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;