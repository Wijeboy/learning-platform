import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShopDetails.css';

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shops/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    if (id) fetchCourseDetails();
  }, [id]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!course) return <div className="error-container"><h2>Course not found!</h2><button onClick={() => navigate('/')}>Go Back</button></div>;

  return (
    <div className="course-details-wrapper">
      <header className="details-header" style={{ backgroundColor: '#6366f1' }}>
        <div className="container">
          <nav className="breadcrumb">Home / Shops / <span className="active">{course.category}</span></nav>
          <h1 className="main-title">{course.name}</h1>
          <div className="quick-meta">
            <span className="badge">{course.category}</span>
            <span className="rating">⭐⭐⭐⭐⭐ 4.9 (2,450 Reviews)</span>
          </div>
        </div>
      </header>

      <div className="container main-content-grid">
        <div className="details-left">
          <div className="content-card">
            <h3>Description</h3>
            <p className="description-text">
              {course.description || "Master your skills with this comprehensive course. Designed for both beginners and professionals."}
            </p>
          </div>

          <div className="content-card">
            <h3>What you'll learn</h3>
            <ul className="learning-points">
              <li>✅ Comprehensive understanding of {course.category}</li>
              <li>✅ Hands-on projects and practical assignments</li>
              <li>✅ Industry-standard best practices</li>
              <li>✅ Exclusive resources</li>
            </ul>
          </div>
        </div>

        <aside className="details-sidebar">
          <div className="sticky-card">
            <div className="preview-video">
              <img src={course.image} alt={course.name} />
              <div className="play-btn">▶</div>
            </div>
            
            <div className="price-tag">
              <span className="amount">{course.price === "Free" ? "FREE" : course.price}</span>
              {course.price !== "Free" && <span className="old-price">$99.99</span>}
            </div>

            <div className="action-buttons">
              <button className="btn-enroll">Enroll Now</button>
              <button className="btn-wishlist">Add to Wishlist</button>
            </div>

            <div className="course-includes">
              <h4>This course includes:</h4>
              <ul>
                <li>📄 Full lifetime access</li>
                <li>📱 Access on mobile and TV</li>
                <li>🏆 Certificate of completion</li>
                <li>💬 24/7 Instructor support</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShopDetails;