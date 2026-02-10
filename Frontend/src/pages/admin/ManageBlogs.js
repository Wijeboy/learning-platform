import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs, deleteBlog } from '../../services/blogService';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './ManageBlogs.css';

const ManageBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        alert('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <div className="loading-state">Loading blogs...</div>;
  }

  return (
    <div className="manage-blogs-page">
      <div className="manage-blogs-header">
        <h1>Manage Blogs</h1>
        <button 
          className="add-blog-btn"
          onClick={() => navigate('/admin/add-blog')}
        >
          + Add New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blogs added yet</p>
          <button 
            className="btn-add"
            onClick={() => navigate('/admin/add-blog')}
          >
            Add Your First Blog
          </button>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="card-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(blog._id)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(blog._id)}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="blog-image">
                <img 
                  src={`http://localhost:5001${blog.blogImage}`} 
                  alt={blog.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              
              <div className="blog-info">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-date">{formatDate(blog.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;