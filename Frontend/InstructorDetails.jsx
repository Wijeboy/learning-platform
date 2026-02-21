import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import './InstructorDetails.css';

const InstructorDetails = () => {
  // 1. Get the dynamic ID from the URL
  const { id } = useParams();
  
  // 2. State management for Data and Loading
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch specific instructor details from Port 5001
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/instructors/${id}`);
        setInstructor(res.data);
      } catch (err) {
        console.error("Error fetching instructor details:", err);
        setError("Could not load instructor profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  // 4. Loading State UI
  if (loading) {
    return <div className="loading-container">Loading Instructor Profile...</div>;
  }

  // 5. Error State UI
  if (error || !instructor) {
    return <div className="error-container">{error || "Instructor not found"}</div>;
  }

  return (
    <div className="page-wrapper">
      {/* 1. HEADER / BREADCRUMB */}
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{instructor.name}</h1>
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/Instructors" className="breadcrumb-link">Instructors</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{instructor.name}</span>
          </div>
        </div>
      </header>

      <div className="container">
        {/* 2. Dynamic Profile Header Card */}
        <section className="profile-header-card">
          <div className="profile-image-wrapper">
            <img 
              src={instructor.image || "https://via.placeholder.com/300"} 
              alt={instructor.name} 
              className="profile-img" 
            />
          </div>
          <div className="profile-info">
            <h2>{instructor.name}</h2>
            <p className="job-title">Expert {instructor.role}</p>
            
            <div className="meta-info">
              <span className="meta-item">
                <span className="meta-label">Rating:</span>
                <span className="meta-value">⭐ {instructor.rating || "5.0"} ({instructor.reviews || 0} Reviews)</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Email:</span>
                <span className="meta-value">{instructor.email || "Contact via form"}</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Phone:</span>
                <span className="meta-value">{instructor.phone || "Not provided"}</span>
              </span>
            </div>

            <p className="bio">
              {instructor.bio || `I am an expert in ${instructor.role} with a passion for teaching students 
              the best practices of modern technology and production-ready development.`}
            </p>

            <div className="social-icons">
              <button className="icon-btn fb"><FaFacebookF size={18} color="white" /></button>
              <button className="icon-btn tw"><FaTwitter size={18} color="white" /></button>
              <button className="icon-btn ln"><FaLinkedinIn size={18} color="white" /></button>
              <button className="icon-btn yt"><FaYoutube size={18} color="white" /></button>
            </div>
          </div>
        </section>

        {/* 3. Main Content Layout */}
        <div className="instructor-layout">
          <div className="details-left">
            <section className="info-box">
              <h3>Why Learn From {instructor.name.split(' ')[0]}?</h3>
              <ul>
                <li><strong>Industry-First Approach:</strong> Master workflows used by professional engineers.</li>
                <li><strong>Tech Stack Expertise:</strong> Specializing in {instructor.tags ? instructor.tags.join(', ') : instructor.role}.</li>
                <li><strong>Project-Based:</strong> Build a high-quality portfolio during the course.</li>
              </ul>
            </section>

            <section className="info-box">
              <h3>Skills & Tech Stack</h3>
              <div className="tags-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                {instructor.tags && instructor.tags.map((tag, i) => (
                  <span key={i} className="tag" style={{ background: '#6c63ff', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* 4. Contact Sidebar */}
          <aside className="contact-sidebar">
            <div className="contact-card">
              <h3>Quick Contact</h3>
              <p>Send a direct message to {instructor.name.split(' ')[0]} regarding your queries.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="E-mail" />
                <input type="text" placeholder="Topic" />
                <textarea placeholder="Message"></textarea>
                <button type="submit" className="btn-send">Send Message</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;