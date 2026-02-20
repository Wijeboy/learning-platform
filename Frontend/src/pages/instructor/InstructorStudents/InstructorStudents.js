import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../../../services/courseService';
import { getInstructorEnrollments } from '../../../services/enrollmentService';
import { FiSearch, FiBook, FiMail, FiUser, FiCalendar, FiAward, FiTrendingUp } from 'react-icons/fi';
import './InstructorStudents.css';

const InstructorStudents = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completedCourses: 0,
    averageProgress: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesData, enrollmentsData] = await Promise.all([
        getInstructorCourses(),
        getInstructorEnrollments()
      ]);
      
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
      
      // Calculate stats
      const uniqueStudents = new Set(enrollmentsData.map(e => e.student._id)).size;
      const completed = enrollmentsData.filter(e => e.completionPercentage === 100).length;
      const avgProgress = enrollmentsData.length > 0
        ? enrollmentsData.reduce((acc, e) => acc + e.completionPercentage, 0) / enrollmentsData.length
        : 0;
      const active = enrollmentsData.filter(e => e.completionPercentage > 0 && e.completionPercentage < 100).length;
      
      setStats({
        totalStudents: uniqueStudents,
        activeStudents: active,
        completedCourses: completed,
        averageProgress: Math.round(avgProgress)
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesCourse = selectedCourse === 'all' || enrollment.course._id === selectedCourse;
    const matchesSearch = searchQuery === '' || 
      enrollment.student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesSearch;
  });

  if (loading) {
    return <div className="instructor-students-loading">Loading students...</div>;
  }

  return (
    <div className="instructor-students-page">
      <div className="students-header">
        <h1>My Students</h1>
        <p>Track and manage your students' progress</p>
      </div>

      {/* Stats Cards */}
      <div className="students-stats">
        <div className="stat-card-students primary">
          <div className="stat-icon-wrapper">
            <FiUser className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card-students success">
          <div className="stat-icon-wrapper">
            <FiTrendingUp className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>{stats.activeStudents}</h3>
            <p>Active Learners</p>
          </div>
        </div>
        <div className="stat-card-students info">
          <div className="stat-icon-wrapper">
            <FiAward className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>{stats.completedCourses}</h3>
            <p>Completed Enrollments</p>
          </div>
        </div>
        <div className="stat-card-students warning">
          <div className="stat-icon-wrapper">
            <FiBook className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>{stats.averageProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="students-filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-filter"
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>
      </div>

      {/* Students List */}
      <div className="students-list-section">
        {filteredEnrollments.length === 0 ? (
          <div className="no-students">
            <div className="no-students-icon">👥</div>
            <h3>No students found</h3>
            <p>{searchQuery || selectedCourse !== 'all' 
              ? 'Try adjusting your filters' 
              : 'You don\'t have any enrolled students yet'}</p>
          </div>
        ) : (
          <div className="students-table">
            <div className="table-header">
              <div className="col-student">Student</div>
              <div className="col-course">Course</div>
              <div className="col-enrolled">Enrolled Date</div>
              <div className="col-progress">Progress</div>
              <div className="col-status">Status</div>
            </div>
            <div className="table-body">
              {filteredEnrollments.map(enrollment => (
                <div key={enrollment._id} className="table-row">
                  <div className="col-student">
                    <div className="student-info">
                      <div className="student-avatar">
                        {enrollment.student.firstName.charAt(0).toUpperCase()}
                      </div>
                      <div className="student-details">
                        <div className="student-name">
                          {enrollment.student.firstName} {enrollment.student.lastName}
                        </div>
                        <div className="student-email">
                          <FiMail size={12} />
                          {enrollment.student.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-course">
                    <div className="course-badge">{enrollment.course.title}</div>
                  </div>
                  <div className="col-enrolled">
                    <FiCalendar size={14} />
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </div>
                  <div className="col-progress">
                    <div className="progress-container">
                      <div className="progress-bar-table">
                        <div 
                          className="progress-fill-table" 
                          style={{ width: `${enrollment.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="progress-text-table">{enrollment.completionPercentage}%</span>
                    </div>
                  </div>
                  <div className="col-status">
                    {enrollment.completionPercentage === 100 ? (
                      <span className="status-badge completed">Completed</span>
                    ) : enrollment.completionPercentage > 0 ? (
                      <span className="status-badge in-progress">In Progress</span>
                    ) : (
                      <span className="status-badge not-started">Not Started</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorStudents;
