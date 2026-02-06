import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-welcome">Welcome, {user?.firstName} {user?.lastName}</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students">👨‍🎓</div>
            <div className="stat-content">
              <h3>{stats.students}</h3>
              <p>Total Students</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon instructors">👨‍🏫</div>
            <div className="stat-content">
              <h3>{stats.instructors}</h3>
              <p>Total Instructors</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon admins">👔</div>
            <div className="stat-content">
              <h3>{stats.admins}</h3>
              <p>Total Admins</p>
            </div>
          </div>
        </div>

        <div className="actions-grid">
          <Link to="/admin/manage-students" className="action-card">
            <div className="action-icon">👥</div>
            <h3>Manage Students</h3>
            <p>View, edit, and manage student accounts</p>
          </Link>

          <Link to="/admin/manage-instructors" className="action-card">
            <div className="action-icon">🎓</div>
            <h3>Manage Instructors</h3>
            <p>View, add, and manage instructor accounts</p>
          </Link>

          <Link to="/admin/manage-admins" className="action-card">
            <div className="action-icon">⚙️</div>
            <h3>Manage Admins</h3>
            <p>View, add, and manage admin accounts</p>
          </Link>

          <Link to="/admin/create-instructor" className="action-card create">
            <div className="action-icon">➕</div>
            <h3>Add Instructor</h3>
            <p>Create new instructor account</p>
          </Link>

          <Link to="/admin/create-admin" className="action-card create">
            <div className="action-icon">➕</div>
            <h3>Add Admin</h3>
            <p>Create new admin account</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
