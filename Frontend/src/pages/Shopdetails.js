import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Shopdetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shops/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    if (id) fetchCourseDetails();
  }, [id]);

  if (loading) return <div className="page-wrapper" style={{padding: "150px", textAlign: "center"}}><h2>Loading details...</h2></div>;
  if (!course) return <div className="page-wrapper" style={{padding: "150px", textAlign: "center"}}><h2>Course not found!</h2></div>;

  return (
    <div className="page-wrapper">
      {/* Header Section */}
      <header className="page-header">
        <div className="container">
          <div className="breadcrumb">Home / Shop / <span>Details</span></div>
          <h1>{course.name}</h1>
        </div>
      </header>

      <div className="container main-layout">
        {/* LEFT CONTENT */}
        <main className="content-area">
          <section className="course-intro-card">
            <h2 className="course-title">{course.name}</h2>
            <div>
              <span className="star-icons">★★★★★</span> 
              <span className="rating-badge"> {course.rating || "4.9"} (Verified)</span>
            </div>
            <p className="course-desc" style={{marginTop: "20px", color: "#5e6282", lineHeight: "1.6"}}>
              {course.description || "No description available for this course yet."}
            </p>
          </section>

          <section className="learning-goals">
            <h3>Course Overview</h3>
            <ul className="goals-list">
              <li><strong>Category:</strong> {course.category}</li>
              <li><strong>Language:</strong> {course.language || "English"}</li>
              <li><strong>Instructor:</strong> {course.instructor || "Expert Admin"}</li>
              <li><strong>Access:</strong> Full Lifetime Access</li>
            </ul>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="sidebar">
          <div className="purchase-card">
            <div className="video-preview">
              <img src={course.image} alt={course.name} />
              <div className="play-button-overlay">
                <div className="play-icon">▶</div>
              </div>
            </div>
            <div className="price-section">
              <span className="current-price">{course.price}</span>
              {course.price !== "Free" && <span className="discount-tag">Special Price</span>}
            </div>
            <button className="btn btn-start">ENROLL NOW</button>
            <button className="btn btn-purchase">ADD TO WISHLIST</button>
            
            <div className="course-features">
              <p>THIS COURSE INCLUDES:</p>
              <ul>
                <li>🌐 {course.language?.toUpperCase() || "ENGLISH"} CONTENT</li>
                <li>⏱ SELF-PACED LEARNING</li>
                <li>🎓 CERTIFICATE OF COMPLETION</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;