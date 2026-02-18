import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyEnrollments } from '../../services/enrollmentService';
import { getMyPurchases } from '../../services/purchaseService';
import { FiPlay, FiDownload, FiBookOpen, FiTrendingUp, FiAward, FiClock } from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    inProgress: 0,
    certificates: 0
  });

  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (isAuth && user?.userType === 'student') {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  const fetchData = async () => {
    try {
      const enrollmentsData = await getMyEnrollments();
      setEnrollments(enrollmentsData);
      
      const purchasesData = await getMyPurchases();
      setPurchases(purchasesData.data);
      
      // Calculate stats
      const completed = enrollmentsData.filter(e => e.completionPercentage === 100).length;
      const inProgress = enrollmentsData.filter(e => e.completionPercentage > 0 && e.completionPercentage < 100).length;
      const certificates = enrollmentsData.filter(e => e.certificateIssued).length;
      
      setStats({
        enrolled: enrollmentsData.length,
        completed,
        inProgress,
        certificates
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = (pdfUrl) => {
    if (!pdfUrl) {
      alert('No PDF resource available for this product');
      return;
    }

    const link = document.createElement('a');
    link.href = `http://localhost:5001${pdfUrl}`;
    link.download = pdfUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuth || user?.userType !== 'student') {
    return null;
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Continue your learning journey</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon"><FiBookOpen /></div>
          <div className="stat-info">
            <h3>{stats.enrolled}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FiAward /></div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FiClock /></div>
          <div className="stat-info">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FiTrendingUp /></div>
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

        {/* My Resources Section */}
        <div className="content-section">
          <h2>My Resources</h2>
          {loading ? (
            <div className="loading-state">Loading your resources...</div>
          ) : purchases.length === 0 ? (
            <div className="empty-state">
              <p>You haven't purchased any resources yet.</p>
              <button className="btn-browse" onClick={() => navigate('/shop')}>
                Browse Shop
              </button>
            </div>
          ) : (
            <div className="resources-grid">
              {purchases.map(product => (
                <div key={product._id} className="resource-card">
                  <div className="resource-image">
                    <img 
                      src={`http://localhost:5001${product.image}`} 
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                  <div className="resource-info">
                    <h3 className="resource-title">{product.title}</h3>
                    <button 
                      className="download-pdf-btn"
                      onClick={() => handleDownloadPdf(product.pdfResource)}
                    >
                      <FiDownload /> Download PDF
                    </button>
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