import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { createCourse } from '../../../services/courseService';
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';
import './AddCourse.css';

const AddCourse = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    category: 'General',
    level: 'Beginner'
  });

  const categories = [
    'General', 'Programming', 'Design', 'Business', 'Marketing',
    'Photography', 'Music', 'Health & Fitness', 'Language', 'Other'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const course = await createCourse({
        ...formData,
        price: parseFloat(formData.price)
      });
      alert('Course created successfully!');
      navigate(`/instructor/courses/${course._id}/edit`);
    } catch (error) {
      console.error('Error creating course:', error);
      alert(error.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth || user?.userType !== 'instructor') {
    return null;
  }

  return (
    <div className="add-course-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/instructor/courses')}>
          <FiArrowLeft /> Back to My Courses
        </button>
        <h1>Create New Course</h1>
        <p>Fill in the details to create your course. You can add lessons later.</p>
      </div>

      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Complete Web Development Bootcamp"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Course Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what students will learn in this course..."
              rows="6"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Course Thumbnail</h2>
          <div className="form-group">
            <label htmlFor="thumbnail">
              <FiImage /> Thumbnail Image URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.thumbnail && (
              <div className="thumbnail-preview">
                <img src={formData.thumbnail} alt="Course thumbnail preview" />
              </div>
            )}
            <small className="form-hint">
              Enter a URL to an image (e.g., from Unsplash, Pexels, or your own hosting)
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/instructor/courses')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            <FiSave /> {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
