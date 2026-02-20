import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getInstructorCourses, deleteCourse, togglePublishCourse } from '../../../services/courseService';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiUsers, FiDollarSign } from 'react-icons/fi';
import './MyCourses.css';

const MyCourses = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (isAuth && user?.userType === 'instructor') {
      fetchCourses();
    } else {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  const fetchCourses = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteCourse(courseId);
      alert('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(error.message || 'Failed to delete course');
    }
  };

  const handleTogglePublish = async (courseId) => {
    try {
      await togglePublishCourse(courseId);
      fetchCourses();
    } catch (error) {
      console.error('Error updating course status:', error);
      alert(error.message || 'Failed to update course status');
    }
  };

  if (loading) {
    return (
      <div className="my-courses-page">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="my-courses-page">
      <div className="page-header">
        <div>
          <h1>My Courses</h1>
          <p>Manage your courses and lessons</p>
        </div>
        <button className="btn-create" onClick={() => navigate('/instructor/courses/add')}>
          <FiPlus /> Create New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>No courses yet</h2>
          <p>Create your first course to start teaching students</p>
          <button className="btn-primary" onClick={() => navigate('/instructor/courses/add')}>
            <FiPlus /> Create Your First Course
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-thumbnail">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} />
                ) : (
                  <div className="thumbnail-placeholder">📚</div>
                )}
                <div className="course-status">
                  <span className={`status-badge ${course.isPublished ? 'published' : 'draft'}`}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-stats">
                  <div className="stat">
                    <FiUsers />
                    <span>{course.enrollmentCount || 0} students</span>
                  </div>
                  <div className="stat">
                    <FiDollarSign />
                    <span>${course.price}</span>
                  </div>
                  <div className="stat">
                    <span>📖 {course.lessons?.length || 0} lessons</span>
                  </div>
                </div>

                <div className="course-meta">
                  <span className="category-badge">{course.category}</span>
                  <span className="level-badge">{course.level}</span>
                </div>
              </div>

              <div className="course-actions">
                <button
                  className="btn-icon"
                  onClick={() => navigate(`/instructor/courses/${course._id}/edit`)}
                  title="Edit course"
                >
                  <FiEdit />
                </button>
                <button
                  className="btn-icon"
                  onClick={() => handleTogglePublish(course._id)}
                  title={course.isPublished ? 'Unpublish' : 'Publish'}
                >
                  {course.isPublished ? <FiEyeOff /> : <FiEye />}
                </button>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => handleDelete(course._id, course.title)}
                  title="Delete course"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
