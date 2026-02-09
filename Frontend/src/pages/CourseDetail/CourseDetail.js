import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../services/courseService';
import { enrollInCourse } from '../../services/enrollmentService';
import { useAuth } from '../../context/AuthContext';
import { 
  FiClock, FiUsers, FiBook, FiStar, FiAward, 
  FiCheck, FiPlay, FiFileText, FiDownload, FiArrowLeft 
} from 'react-icons/fi';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const data = await getCourse(id);
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!isAuth) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }
    
    if (course.price > 0) {
      setShowPaymentModal(true);
    } else {
      processEnrollment();
    }
  };

  const processEnrollment = async () => {
    setEnrolling(true);
    setError('');
    
    try {
      await enrollInCourse(course._id);
      alert('Successfully enrolled in the course!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Enrollment error:', error);
      setError(error.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
      setShowPaymentModal(false);
    }
  };

  const handlePayment = async (paymentMethod) => {
    // Simulate payment processing
    setEnrolling(true);
    
    setTimeout(() => {
      processEnrollment();
    }, 1500);
  };

  if (loading) {
    return <div className="course-detail-loading">Loading course details...</div>;
  }

  if (error && !course) {
    return (
      <div className="course-detail-error">
        <h2>Error Loading Course</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/courses')} className="btn-back">
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-error">
        <h2>Course Not Found</h2>
        <button onClick={() => navigate('/courses')} className="btn-back">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <button onClick={() => navigate('/courses')} className="btn-back-nav">
        <FiArrowLeft /> Back to Courses
      </button>

      {/* Hero Section */}
      <div className="course-hero">
        <div className="course-hero-content">
          <div className="course-hero-left">
            <div className="course-badges">
              <span className="category-badge">{course.category}</span>
              <span className="level-badge">{course.level}</span>
            </div>
            <h1>{course.title}</h1>
            <p className="course-description-hero">{course.description}</p>
            
            <div className="course-meta-info">
              <div className="meta-item">
                <FiUsers />
                <span>{course.enrollmentCount || 0} students enrolled</span>
              </div>
              <div className="meta-item">
                <FiBook />
                <span>{course.lessons?.length || 0} lessons</span>
              </div>
              {course.totalDuration > 0 && (
                <div className="meta-item">
                  <FiClock />
                  <span>{Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m total</span>
                </div>
              )}
              {course.rating > 0 && (
                <div className="meta-item">
                  <FiStar className="star-icon" />
                  <span>{course.rating.toFixed(1)} rating</span>
                </div>
              )}
            </div>

            <div className="course-instructor-info">
              <div className="instructor-avatar">
                {course.instructor?.firstName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="instructor-label">Instructor</p>
                <p className="instructor-name">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </p>
              </div>
            </div>
          </div>

          <div className="course-hero-right">
            <div className="course-enroll-card">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} className="course-preview-img" />
              ) : (
                <div className="course-preview-placeholder">📚</div>
              )}
              
              <div className="enroll-card-content">
                <div className="course-price-section">
                  {course.price === 0 ? (
                    <div className="price-free">Free</div>
                  ) : (
                    <div className="price-paid">
                      <span className="currency">$</span>
                      <span className="amount">{course.price}</span>
                    </div>
                  )}
                </div>

                {error && <div className="enroll-error">{error}</div>}

                <button 
                  onClick={handleEnroll} 
                  className="btn-enroll-now"
                  disabled={enrolling}
                >
                  {enrolling ? 'Processing...' : 'Enroll Now'}
                </button>

                <div className="enroll-includes">
                  <h4>This course includes:</h4>
                  <ul>
                    <li><FiPlay /> {course.lessons?.length || 0} video lessons</li>
                    <li><FiClock /> {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m of content</li>
                    <li><FiFileText /> Downloadable resources</li>
                    <li><FiAward /> Certificate of completion</li>
                    <li><FiDownload /> Lifetime access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="course-content-section">
        <div className="course-content-container">
          <h2>Course Content</h2>
          <div className="lessons-list">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, index) => (
                <div key={lesson._id || index} className="lesson-item">
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info">
                    <h3>{lesson.title}</h3>
                    {lesson.duration > 0 && (
                      <div className="lesson-duration">
                        <FiClock size={14} />
                        <span>{lesson.duration} min</span>
                      </div>
                    )}
                    {lesson.materials && lesson.materials.length > 0 && (
                      <div className="lesson-materials">
                        <FiFileText size={14} />
                        <span>{lesson.materials.length} resource{lesson.materials.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  <div className="lesson-icon">
                    <FiPlay />
                  </div>
                </div>
              ))
            ) : (
              <p className="no-lessons">No lessons available yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Complete Your Payment</h2>
            <div className="payment-summary">
              <h3>{course.title}</h3>
              <div className="payment-amount">
                <span>Total Amount:</span>
                <span className="amount">${course.price}</span>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Select Payment Method</h4>
              <button 
                onClick={() => handlePayment('card')} 
                className="payment-method-btn"
                disabled={enrolling}
              >
                <span>💳</span>
                <span>Credit / Debit Card</span>
              </button>
              <button 
                onClick={() => handlePayment('paypal')} 
                className="payment-method-btn"
                disabled={enrolling}
              >
                <span>🅿️</span>
                <span>PayPal</span>
              </button>
              <button 
                onClick={() => handlePayment('bank')} 
                className="payment-method-btn"
                disabled={enrolling}
              >
                <span>🏦</span>
                <span>Bank Transfer</span>
              </button>
            </div>

            {enrolling && <div className="payment-processing">Processing payment...</div>}

            <button 
              onClick={() => setShowPaymentModal(false)} 
              className="btn-cancel-payment"
              disabled={enrolling}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
