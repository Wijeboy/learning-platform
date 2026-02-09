import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || user?.userType !== 'instructor') {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  if (!isAuth || user?.userType !== 'instructor') {
    return null;
  }

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
        <p>Instructor Dashboard</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>My Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>$0</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>My Courses</h2>
          <div className="empty-state">
            <p>You haven't created any courses yet.</p>
            <button className="btn-create" onClick={() => navigate('/instructor/create-course')}>
              Create New Course
            </button>
          </div>
        </div>

        <div className="content-section">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <p>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
