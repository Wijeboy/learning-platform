import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth || user?.userType !== 'student') {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  if (!isAuth || user?.userType !== 'student') {
    return null;
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
        <p>Your Learning Dashboard</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Completed Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Certificates</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>My Courses</h2>
          <div className="empty-state">
            <p>You haven't enrolled in any courses yet.</p>
            <button className="btn-browse" onClick={() => navigate('/courses')}>
              Browse Courses
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

export default StudentDashboard;
