import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog, addComment } from '../../services/blogService';
import { FiCalendar, FiUser } from 'react-icons/fi';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState({
    name: '',
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await getBlog(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to fetch blog details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;

    // Validate name to only accept letters and spaces
    if (name === 'name') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setCommentData({
        ...commentData,
        [name]: lettersOnly
      });
    } else {
      setCommentData({
        ...commentData,
        [name]: value
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addComment(id, commentData);
      setCommentData({ name: '', comment: '' });
      fetchBlog(); // Refresh to show new comment
      alert('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="error-state">Blog not found</div>;
  }

  return (
    <div className="blog-detail-page">
      {/* Background Education Icons */}
      <div className="background-icons">
        <span className="icon-float icon-1">📚</span>
        <span className="icon-float icon-2">🎓</span>
        <span className="icon-float icon-3">✏️</span>
        <span className="icon-float icon-4">📖</span>
        <span className="icon-float icon-5">🎯</span>
        <span className="icon-float icon-6">💡</span>
        <span className="icon-float icon-7">📝</span>
        <span className="icon-float icon-8">🏆</span>
      </div>

      <div className="blog-detail-container">
        {/* Blog Image */}
        <div className="blog-detail-image-container">
          <img 
            src={`http://localhost:5001${blog.blogImage}`} 
            alt={blog.title}
            className="blog-detail-image"
            onError={(e) => {
              e.target.src = '/placeholder-image.png';
            }}
          />
        </div>

        {/* Category and Date */}
        <div className="blog-header-meta">
          <span className="blog-detail-category">{blog.category}</span>
          <div className="blog-date-display">
            <FiCalendar className="date-icon" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* Author Section */}
        <div className="author-section">
          <div className="author-image">
            <img 
              src={`http://localhost:5001${blog.authorImage}`} 
              alt={blog.authorName}
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
              }}
            />
          </div>
          <div className="author-info">
            <span className="author-label">Author</span>
            <span className="author-name">{blog.authorName}</span>
          </div>
        </div>

        {/* Blog Title */}
        <h1 className="blog-detail-title">{blog.title}</h1>

        {/* Overview Section */}
        <div className="blog-section">
          <h2 className="section-title">Overview</h2>
          <p className="section-text">{blog.overview}</p>
        </div>

        {/* Blog Description Section */}
        <div className="blog-section">
          <h2 className="section-title">Blog Description</h2>
          <p className="section-text">{blog.detailedDescription}</p>
        </div>

        {/* Leave a Comment Section */}
        <div className="comment-section">
          <h3 className="comment-section-title">Leave a Comment</h3>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={commentData.name}
                onChange={handleCommentChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Add Your Comment</label>
              <textarea
                name="comment"
                value={commentData.comment}
                onChange={handleCommentChange}
                className="form-textarea"
                rows="4"
                required
              />
            </div>

            <button 
              type="submit" 
              className="post-comment-btn"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3 className="reviews-title">Reviews</h3>
          {blog.comments && blog.comments.length > 0 ? (
            <div className="comments-list">
              {blog.comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-avatar">
                    <FiUser />
                  </div>
                  <div className="comment-content">
                    <h4 className="comment-author">{comment.name}</h4>
                    <p className="comment-text">{comment.comment}</p>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;