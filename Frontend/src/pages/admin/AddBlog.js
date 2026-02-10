import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../services/blogService';
import './AddBlog.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    overview: '',
    detailedDescription: '',
    authorName: ''
  });
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);

  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate authorName to only accept letters and spaces
    if (name === 'authorName') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({
        ...formData,
        [name]: lettersOnly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      setBlogImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAuthorImage(file);
      setAuthorImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogImage) {
      alert('Please upload a blog image');
      return;
    }

    if (!authorImage) {
      alert('Please upload an author image');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('overview', formData.overview);
      formDataToSend.append('detailedDescription', formData.detailedDescription);
      formDataToSend.append('authorName', formData.authorName);
      formDataToSend.append('blogImage', blogImage);
      formDataToSend.append('authorImage', authorImage);

      await createBlog(formDataToSend);
      alert('Blog posted successfully!');
      navigate('/admin/manage-blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert(error.message || 'Failed to post blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-page">
      <div className="add-blog-container">
        <h1 className="add-blog-title">Add a Blog Post</h1>

        <form onSubmit={handleSubmit} className="add-blog-form">
          {/* Blog Image Upload */}
          <div className="form-group">
            <label className="form-label required">Blog Image</label>
            <div className="image-upload-section">
              {blogImagePreview ? (
                <div className="image-preview">
                  <img src={blogImagePreview} alt="Blog Preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setBlogImage(null);
                      setBlogImagePreview(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageChange}
                    required
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <p>Click to upload blog image</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label required">Add Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label required">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Overview */}
          <div className="form-group">
            <label className="form-label required">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          {/* Detailed Description */}
          <div className="form-group">
            <label className="form-label required">Detailed Description</label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              className="form-textarea"
              rows="6"
              required
            />
          </div>

          {/* Author Name */}
          <div className="form-group">
            <label className="form-label required">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Author Image Upload */}
          <div className="form-group">
            <label className="form-label required">Author Photo</label>
            <div className="image-upload-section">
              {authorImagePreview ? (
                <div className="image-preview author-preview">
                  <img src={authorImagePreview} alt="Author Preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setAuthorImage(null);
                      setAuthorImagePreview(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="upload-box small-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAuthorImageChange}
                    required
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">👤</span>
                    <p>Click to upload author photo</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;