import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../../services/blogService';
import { FiFilter, FiCalendar, FiUser } from 'react-icons/fi';
import './Blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, blogs]);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data.data);
      setFilteredBlogs(data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    let filtered = [...blogs];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(blog => 
        selectedCategories.includes(blog.category)
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <div className="loading-state">Loading blogs...</div>;
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <FiFilter className="filter-icon-header" />
          </div>

          {/* Categories Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            {categories.map((category) => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Blogs Section */}
        <main className="blogs-section">
          <div className="blogs-header">
            <h2 className="blogs-count">{filteredBlogs.length} blogs</h2>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="empty-state">
              <p>No blogs found matching your filters</p>
            </div>
          ) : (
            <div className="blogs-grid-public">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="public-blog-card"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  <div className="public-blog-image">
                    <img 
                      src={`http://localhost:5001${blog.blogImage}`} 
                      alt={blog.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                  <div className="public-blog-info">
                    <h3 className="public-blog-title">{blog.title}</h3>
                    
                    <div className="public-blog-meta">
                      <div className="meta-item-blog">
                        <FiCalendar className="meta-icon-blog" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="meta-item-blog">
                        <FiUser className="meta-icon-blog" />
                        <span>by Admin</span>
                      </div>
                    </div>
                    
                    <span className="public-blog-category">{blog.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;