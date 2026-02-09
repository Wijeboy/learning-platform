import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyEnrollments } from '../../services/enrollmentService';
import { FiBook, FiClock, FiPlay, FiAward } from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0,
    certificates: 0
  });

  useEffect(() => {
    if (!isAuth || user?.userType !== 'student') {
      navigate('/login');
    } else {
      fetchEnrollments();
    }
  }, [isAuth, user, navigate]);

  const fetchEnrollments = async () => {
    try {
      const data = await getMyEnrollments();
      setEnrollments(data);
      
      // Calculate stats
      const completed = data.filter(e => e.completionPercentage === 100).length;
      const inProgress = data.filter(e => e.completionPercentage > 0 && e.completionPercentage < 100).length;
      const certificates = data.filter(e => e.certificateIssued).length;
      
      setStats({
        enrolled: data.length,
        completed,
        inProgress,
        certificates
      });
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

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
            <h3>{stats.enrolled}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>{stats.certificates}</h3>
            <p>Certificates</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>My Courses</h2>
          {loading ? (
            <div className="loading-state">Loading your courses...</div>
          ) : enrollments.length === 0 ? (
            <div className="empty-state">
              <p>You haven't enrolled in any courses yet.</p>
              <button className="btn-browse" onClick={() => navigate('/courses')}>
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="courses-list">
              {enrollments.map(enrollment => (
                <div 
                  key={enrollment._id} 
                  className="enrolled-course-card"
                  onClick={() => navigate(`/student/courses/${enrollment.course._id}`)}
                >
                  <div className="course-thumbnail-small">
                    {enrollment.course.thumbnail ? (
                      <img src={enrollment.course.thumbnail} alt={enrollment.course.title} />
                    ) : (
                      <div className="thumbnail-placeholder">📚</div>
                    )}
                  </div>
                  <div className="course-details">
                    <h3>{enrollment.course.title}</h3>
                    <p className="course-instructor">
                      By {enrollment.course.instructor?.firstName} {enrollment.course.instructor?.lastName}
                    </p>
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${enrollment.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{enrollment.completionPercentage}% Complete</span>
                    </div>
                  </div>
                  <button className="btn-continue">
                    <FiPlay /> Continue Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-section">
          <h2>Recent Activity</h2>
          {enrollments.length === 0 ? (
            <div className="empty-state">
              <p>No recent activity to display.</p>
            </div>
          ) : (
            <div className="activity-list">
              {enrollments.slice(0, 5).map(enrollment => (
                <div key={enrollment._id} className="activity-item">
                  <div className="activity-icon">📖</div>
                  <div className="activity-content">
                    <p><strong>Enrolled in</strong> {enrollment.course.title}</p>
                    <span className="activity-date">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
