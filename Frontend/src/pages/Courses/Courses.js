import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../services/courseService';
import { FiSearch, FiDollarSign, FiClock, FiUsers, FiBook } from 'react-icons/fi';
import './Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    level: ''
  });

  const categories = [
    'All', 'Programming', 'Design', 'Business', 'Marketing',
    'Photography', 'Music', 'Health & Fitness', 'Language', 'Other'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      const queryFilters = {};
      if (filters.search) queryFilters.search = filters.search;
      if (filters.category && filters.category !== 'All') queryFilters.category = filters.category;
      if (filters.level && filters.level !== 'All') queryFilters.level = filters.level;

      const data = await getAllCourses(queryFilters);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Discover amazing courses from expert instructors</p>
      </div>

      <div className="courses-filters">
        <form onSubmit={handleSearch} className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </form>

        <div className="filter-buttons">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            {categories.map(cat => (
              <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          >
            {levels.map(lvl => (
              <option key={lvl} value={lvl === 'All' ? '' : lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>No courses found</h2>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <>
          <div className="courses-count">
            <p>{courses.length} course{courses.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="courses-grid">
            {courses.map(course => (
              <div 
                key={course._id} 
                className="course-card"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <div className="course-thumbnail">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} />
                  ) : (
                    <div className="thumbnail-placeholder">📚</div>
                  )}
                </div>

                <div className="course-content">
                  <div className="course-meta-top">
                    <span className="category-badge">{course.category}</span>
                    <span className="level-badge">{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  <div className="course-instructor">
                    <span>By {course.instructor?.firstName} {course.instructor?.lastName}</span>
                  </div>

                  <div className="course-stats">
                    <div className="stat">
                      <FiUsers size={14} />
                      <span>{course.enrollmentCount || 0}</span>
                    </div>
                    <div className="stat">
                      <FiBook size={14} />
                      <span>{course.lessons?.length || 0} lessons</span>
                    </div>
                    {course.totalDuration > 0 && (
                      <div className="stat">
                        <FiClock size={14} />
                        <span>{Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m</span>
                      </div>
                    )}
                  </div>

                  <div className="course-footer">
                    <div className="course-price">
                      <FiDollarSign />
                      <span className="price">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                    </div>
                    <button className="btn-enroll">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
