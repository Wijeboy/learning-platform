import React, { useState, useEffect } from 'react';
import { getInstructorCourses } from '../../../services/courseService';
import { getInstructorEnrollments } from '../../../services/enrollmentService';
import { 
  FiTrendingUp, FiUsers, FiDollarSign, FiStar, FiBook, 
  FiAward, FiClock, FiTarget, FiBarChart2 
} from 'react-icons/fi';
import './InstructorAnalytics.css';

const InstructorAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [analytics, setAnalytics] = useState({
    overview: {
      totalRevenue: 0,
      totalStudents: 0,
      totalCourses: 0,
      averageRating: 0,
      completionRate: 0,
      activeStudents: 0
    },
    coursePerformance: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [coursesData, enrollmentsData] = await Promise.all([
        getInstructorCourses(),
        getInstructorEnrollments()
      ]);
      
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
      
      // Calculate overview stats
      const totalRevenue = enrollmentsData.reduce((sum, e) => sum + (e.paymentAmount || 0), 0);
      const uniqueStudents = new Set(enrollmentsData.map(e => e.student._id)).size;
      const totalCourses = coursesData.length;
      const publishedCourses = coursesData.filter(c => c.isPublished).length;
      
      const averageRating = coursesData.length > 0
        ? coursesData.reduce((sum, c) => sum + (c.rating || 0), 0) / coursesData.length
        : 0;
      
      const completedEnrollments = enrollmentsData.filter(e => e.completionPercentage === 100).length;
      const completionRate = enrollmentsData.length > 0
        ? (completedEnrollments / enrollmentsData.length) * 100
        : 0;
      
      const activeStudents = enrollmentsData.filter(
        e => e.completionPercentage > 0 && e.completionPercentage < 100
      ).length;
      
      // Calculate course performance
      const coursePerformance = coursesData.map(course => {
        const courseEnrollments = enrollmentsData.filter(e => e.course._id === course._id);
        const revenue = courseEnrollments.reduce((sum, e) => sum + (e.paymentAmount || 0), 0);
        const avgProgress = courseEnrollments.length > 0
          ? courseEnrollments.reduce((sum, e) => sum + e.completionPercentage, 0) / courseEnrollments.length
          : 0;
        const completed = courseEnrollments.filter(e => e.completionPercentage === 100).length;
        
        return {
          id: course._id,
          title: course.title,
          students: courseEnrollments.length,
          revenue,
          avgProgress: Math.round(avgProgress),
          completed,
          rating: course.rating || 0,
          isPublished: course.isPublished
        };
      }).sort((a, b) => b.students - a.students);
      
      setAnalytics({
        overview: {
          totalRevenue,
          totalStudents: uniqueStudents,
          totalCourses,
          publishedCourses,
          averageRating: averageRating.toFixed(1),
          completionRate: Math.round(completionRate),
          activeStudents
        },
        coursePerformance
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  return (
    <div className="instructor-analytics-page">
      <div className="analytics-header">
        <h1>Analytics & Reports</h1>
        <p>Track your teaching performance and course statistics</p>
      </div>

      {/* Overview Stats */}
      <div className="analytics-overview">
        <div className="overview-card revenue">
          <div className="overview-icon">
            <FiDollarSign />
          </div>
          <div className="overview-content">
            <h3>${analytics.overview.totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        
        <div className="overview-card students">
          <div className="overview-icon">
            <FiUsers />
          </div>
          <div className="overview-content">
            <h3>{analytics.overview.totalStudents}</h3>
            <p>Total Students</p>
            <span className="sub-stat">{analytics.overview.activeStudents} active</span>
          </div>
        </div>
        
        <div className="overview-card courses">
          <div className="overview-icon">
            <FiBook />
          </div>
          <div className="overview-content">
            <h3>{analytics.overview.totalCourses}</h3>
            <p>Total Courses</p>
            <span className="sub-stat">{analytics.overview.publishedCourses} published</span>
          </div>
        </div>
        
        <div className="overview-card rating">
          <div className="overview-icon">
            <FiStar />
          </div>
          <div className="overview-content">
            <h3>{analytics.overview.averageRating}</h3>
            <p>Average Rating</p>
            <span className="sub-stat">Across all courses</span>
          </div>
        </div>
        
        <div className="overview-card completion">
          <div className="overview-icon">
            <FiAward />
          </div>
          <div className="overview-content">
            <h3>{analytics.overview.completionRate}%</h3>
            <p>Completion Rate</p>
            <span className="sub-stat">Student success</span>
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="course-performance-section">
        <div className="section-header-analytics">
          <h2><FiBarChart2 /> Course Performance</h2>
          <p>Detailed metrics for each course</p>
        </div>
        
        {analytics.coursePerformance.length === 0 ? (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <h3>No course data available</h3>
            <p>Create and publish courses to see analytics</p>
          </div>
        ) : (
          <div className="performance-table">
            <div className="performance-header">
              <div className="col-course-name">Course</div>
              <div className="col-metric">Students</div>
              <div className="col-metric">Revenue</div>
              <div className="col-metric">Avg Progress</div>
              <div className="col-metric">Completed</div>
              <div className="col-metric">Rating</div>
              <div className="col-metric">Status</div>
            </div>
            
            <div className="performance-body">
              {analytics.coursePerformance.map((course, index) => (
                <div key={course.id} className="performance-row">
                  <div className="col-course-name">
                    <div className="course-rank">#{index + 1}</div>
                    <div className="course-name-text">{course.title}</div>
                  </div>
                  <div className="col-metric">
                    <div className="metric-value">
                      <FiUsers size={16} />
                      {course.students}
                    </div>
                  </div>
                  <div className="col-metric">
                    <div className="metric-value revenue-value">
                      <FiDollarSign size={16} />
                      ${course.revenue.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-metric">
                    <div className="progress-metric">
                      <div className="mini-progress-bar">
                        <div 
                          className="mini-progress-fill" 
                          style={{ width: `${course.avgProgress}%` }}
                        ></div>
                      </div>
                      <span>{course.avgProgress}%</span>
                    </div>
                  </div>
                  <div className="col-metric">
                    <div className="metric-value">
                      <FiAward size={16} />
                      {course.completed}
                    </div>
                  </div>
                  <div className="col-metric">
                    <div className="rating-value">
                      <FiStar size={16} className="star" />
                      {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
                    </div>
                  </div>
                  <div className="col-metric">
                    {course.isPublished ? (
                      <span className="status-badge-analytics published">Published</span>
                    ) : (
                      <span className="status-badge-analytics draft">Draft</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h2>Quick Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <FiTrendingUp className="insight-icon" />
            <h3>Top Performing Course</h3>
            <p>{analytics.coursePerformance.length > 0 
              ? analytics.coursePerformance[0].title 
              : 'No courses yet'}</p>
            {analytics.coursePerformance.length > 0 && (
              <span className="insight-stat">
                {analytics.coursePerformance[0].students} students enrolled
              </span>
            )}
          </div>
          
          <div className="insight-card">
            <FiTarget className="insight-icon" />
            <h3>Engagement Level</h3>
            <p>{analytics.overview.activeStudents > 0 ? 'Good' : 'Low'}</p>
            <span className="insight-stat">
              {analytics.overview.activeStudents} students actively learning
            </span>
          </div>
          
          <div className="insight-card">
            <FiClock className="insight-icon" />
            <h3>Course Completion</h3>
            <p>{analytics.overview.completionRate}% average</p>
            <span className="insight-stat">
              {analytics.overview.completionRate > 50 ? 'Above industry standard' : 'Room for improvement'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
