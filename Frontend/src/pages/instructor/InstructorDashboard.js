import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInstructorCourses } from '../../services/courseService';
import { getInstructorEnrollments } from '../../services/enrollmentService';
import { FiBook, FiUsers, FiStar, FiDollarSign, FiTrendingUp, FiPlus, FiArrowRight, FiEye, FiEdit } from 'react-icons/fi';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    averageRating: 0,
    publishedCourses: 0,
    draftCourses: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (isAuth && user?.userType === 'instructor') {
      fetchDashboardData();
    } else {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [courses, enrollments] = await Promise.all([
        getInstructorCourses(),
        getInstructorEnrollments()
      ]);

      const totalStudents = new Set(enrollments.map(e => e.student?._id)).size;
      const totalEarnings = enrollments.reduce((sum, e) => sum + (e.paymentAmount || 0), 0);
      const publishedCount = courses.filter(c => c.isPublished).length;
      const draftCount = courses.filter(c => !c.isPublished).length;
      
      // Calculate average rating
      const coursesWithRatings = courses.filter(c => c.rating > 0);
      const avgRating = coursesWithRatings.length > 0
        ? (coursesWithRatings.reduce((sum, c) => sum + c.rating, 0) / coursesWithRatings.length).toFixed(1)
        : 0;

      setStats({
        totalCourses: courses.length,
        totalStudents,
        totalEarnings,
        averageRating: avgRating,
        publishedCourses: publishedCount,
        draftCourses: draftCount
      });

      setRecentCourses(courses.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is being checked
  if (user === null) {
    return null;
  }

  if (isAuth && user?.userType !== 'instructor') {
    return null;
  }

  return (
    <div className="instructor-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="welcome-section">
            <h1>Welcome back, {user?.firstName}! 👋</h1>
            <p>Here's what's happening with your courses today</p>
          </div>
          <button className="btn-create-course" onClick={() => navigate('/instructor/courses/add')}>
            <FiPlus /> Create New Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading dashboard...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card-modern primary">
              <div className="stat-icon-wrapper">
                <FiBook className="stat-icon" />
              </div>
              <div className="stat-details">
                <h3>{stats.totalCourses}</h3>
                <p>Total Courses</p>
                <div className="stat-breakdown">
                  <span className="published">{stats.publishedCourses} Published</span>
                  <span className="draft">{stats.draftCourses} Draft</span>
                </div>
              </div>
            </div>

            <div className="stat-card-modern success">
              <div className="stat-icon-wrapper">
                <FiUsers className="stat-icon" />
              </div>
              <div className="stat-details">
                <h3>{stats.totalStudents}</h3>
                <p>Total Students</p>
                <div className="stat-trend">
                  <FiTrendingUp />
                  <span>Active learners</span>
                </div>
              </div>
            </div>

            <div className="stat-card-modern warning">
              <div className="stat-icon-wrapper">
                <FiStar className="stat-icon" />
              </div>
              <div className="stat-details">
                <h3>{stats.averageRating || 'N/A'}</h3>
                <p>Average Rating</p>
                <div className="star-display">
                  {'⭐'.repeat(Math.floor(stats.averageRating))}
                </div>
              </div>
            </div>

            <div className="stat-card-modern info">
              <div className="stat-icon-wrapper">
                <FiDollarSign className="stat-icon" />
              </div>
              <div className="stat-details">
                <h3>${stats.totalEarnings.toFixed(2)}</h3>
                <p>Total Earnings</p>
                <div className="stat-trend">
                  <FiTrendingUp />
                  <span>Revenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <div className="action-card" onClick={() => navigate('/instructor/courses/add')}>
                <div className="action-icon">
                  <FiPlus />
                </div>
                <h3>Create Course</h3>
                <p>Start a new course and share your knowledge</p>
              </div>
              <div className="action-card" onClick={() => navigate('/instructor/courses')}>
                <div className="action-icon">
                  <FiBook />
                </div>
                <h3>Manage Courses</h3>
                <p>Edit, publish, or update your courses</p>
              </div>
              <div className="action-card" onClick={() => navigate('/instructor/courses')}>
                <div className="action-icon">
                  <FiUsers />
                </div>
                <h3>View Students</h3>
                <p>See who's enrolled in your courses</p>
              </div>
            </div>
          </div>

          {/* Recent Courses */}
          <div className="recent-courses-section">
            <div className="section-header">
              <h2>Recent Courses</h2>
              <button className="btn-view-all" onClick={() => navigate('/instructor/courses')}>
                View All <FiArrowRight />
              </button>
            </div>

            {recentCourses.length > 0 ? (
              <div className="courses-list">
                {recentCourses.map(course => (
                  <div key={course._id} className="course-item-modern">
                    <div className="course-thumbnail-small">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} />
                      ) : (
                        <div className="thumbnail-placeholder-small">📚</div>
                      )}
                      <span className={`status-badge-small ${course.isPublished ? 'published' : 'draft'}`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="course-info-modern">
                      <h3>{course.title}</h3>
                      <div className="course-meta-small">
                        <span><FiUsers /> {course.enrollmentCount || 0} students</span>
                        <span><FiBook /> {course.lessons?.length || 0} lessons</span>
                        <span><FiDollarSign />${course.price}</span>
                      </div>
                    </div>
                    <div className="course-actions-small">
                      <button 
                        className="btn-icon-small"
                        onClick={() => navigate(`/instructor/courses/${course._id}/edit`)}
                        title="Edit course"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        className="btn-icon-small"
                        onClick={() => navigate(`/courses/${course._id}`)}
                        title="View course"
                      >
                        <FiEye />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-modern">
                <div className="empty-icon">📚</div>
                <h3>No courses yet</h3>
                <p>Create your first course and start teaching!</p>
                <button className="btn-primary-modern" onClick={() => navigate('/instructor/courses/add')}>
                  <FiPlus /> Create Your First Course
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InstructorDashboard;
