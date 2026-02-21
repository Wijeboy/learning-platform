import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Instructors.css';

const Instructors = () => {
  const navigate = useNavigate();
  
  // State Management
  const [instructorsList, setInstructorsList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // API Configuration
  const API_URL = 'http://localhost:5001/api/instructors';

  // Fetch instructors from Backend on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  /**
   * Fetches the list of instructors from the database
   */
  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      
      // Handle different response structures (Array vs Object with data property)
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      
      setInstructorsList(data);
    } catch (err) {
      console.error("Error fetching instructors:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Predefined Role Categories
  const roles = [
    'Web Development',
    'UI/UX Design',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Cloud Architecture'
  ];

  /**
   * Memoized logic to filter instructors based on Search and Category
   */
  const filteredInstructors = useMemo(() => {
    return instructorsList.filter(instructor => {
      // Category Filter
      const matchesCategory = activeCategory === 'All' || instructor.role === activeCategory;
      
      // Search Filter (checks Name and Role)
      const matchesSearch = searchQuery === '' ||
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.role.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, instructorsList]);

  return (
    <div className="instructors-page">
      {/* Page Header Section */}
      <header className="page-header-banner">
        <div className="header-content">
          <div className="header-top">
            <div>
              <h1 className="page-title">Our Expert Instructors</h1>
              <p className="page-subtitle">Learn from industry leaders and professional experts</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Interactive Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, role or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Category Navigation Tabs */}
        <div className="category-tabs">
          <button 
            onClick={() => setActiveCategory('All')} 
            className={`cat-tab ${activeCategory === 'All' ? 'active' : ''}`}
          >
            🎯 All
          </button>
          {roles.map(role => (
            <button 
              key={role} 
              onClick={() => setActiveCategory(role)} 
              className={`cat-tab ${activeCategory === role ? 'active' : ''}`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Instructors Display Area */}
        {loading ? (
          <div className="loading-spinner">Loading expert instructors...</div>
        ) : (
          <div className="instructor-grid">
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((person) => (
                <div key={person._id} className="instructor-card">
                  {/* Profile Image */}
                  <div className="profile-img-container">
                    <img 
                      src={person.image || 'https://via.placeholder.com/150'} 
                      alt={person.name} 
                      className="profile-img" 
                    />
                  </div>
                  
                  {/* Rating Section */}
                  <div className="rating">
                    <span className="star-icon">⭐</span>
                    <span className="rating-value">{person.rating || "5.0"}</span>
                    <span className="review-count">({person.reviews || "0"})</span>
                  </div>
                  
                  {/* Instructor Info */}
                  <h3 className="instructor-name">{person.name}</h3>
                  <p className="role">{person.role}</p>
                  
                  {/* Expertise Tags */}
                  <div className="tags">
                    {person.tags && person.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <button 
                    className="profile-btn" 
                    onClick={() => navigate(`/instructor/${person._id}`)}
                  >
                    View Full Profile
                  </button>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="no-results">
                <h3>No instructors found matching your criteria.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;