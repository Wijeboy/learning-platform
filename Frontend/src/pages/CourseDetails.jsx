import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Course.css";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // Tab පාලනය සඳහා

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://localhost:5000/api/shops/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="custom-loader"></div>
        <p>Loading Course Experience...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="error-wrapper">
        <h2>Oops! Course Not Found</h2>
        <p>අදාළ පාඨමාලාව සොයාගත නොහැකි විය.</p>
        <Link to="/" className="back-home-btn">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="course-premium-wrapper">
      {/* 1. Hero Header Section */}
      <header className="course-hero-section">
        <div className="container">
          <nav className="breadcrumb-modern">
            Home <span>/</span> Courses <span>/</span> <span className="active">{course.category || "General"}</span>
          </nav>
          
          <div className="hero-badge-row">
            <span className="school-tag">School of Computing</span>
            <span className="level-tag">{course.level || "Expert Level"}</span>
          </div>

          <h1 className="hero-title">{course.title}</h1>
          
          <div className="hero-meta">
            <span className="meta-rating">⭐ 4.9 (2,450 Reviews)</span>
            <span className="meta-students">👥 5,000+ Enrolled</span>
          </div>
        </div>
      </header>

      <div className="container main-content-layout">
        {/* 2. Left Column: Details with Tabs */}
        <main className="content-left">
          
          {/* Main Visual Banner with Gradient */}
          <div className="main-course-banner">
             <div className="banner-gradient-box">
                <img src={course.image || "placeholder.jpg"} alt={course.title} />
                <div className="banner-text-float">
                    <h3>Expert Instructor</h3>
                    <p>Learn from the best in the industry.</p>
                </div>
             </div>
          </div>

          {/* Navigation Tabs */}
          <div className="modern-tabs-nav">
            <button 
              className={activeTab === "overview" ? "tab-link active" : "tab-link"} 
              onClick={() => setActiveTab("overview")}
            >Overview</button>
            <button 
              className={activeTab === "outline" ? "tab-link active" : "tab-link"} 
              onClick={() => setActiveTab("outline")}
            >Course Outline</button>
            <button 
              className={activeTab === "fees" ? "tab-link active" : "tab-link"} 
              onClick={() => setActiveTab("fees")}
            >Fees</button>
          </div>

          {/* Dynamic Tab Content */}
          <div className="tab-render-area">
            {activeTab === "overview" && (
              <section className="info-card-modern animate-in">
                <h3 className="section-title-modern">Description</h3>
                <p className="course-desc-modern">{course.description}</p>
              </section>
            )}

            {activeTab === "outline" && (
              <section className="info-card-modern animate-in">
                <h3 className="section-title-modern">Course Content</h3>
                <div className="outline-container">
                  {course.outline?.map((item, index) => (
                    <div key={index} className="outline-row">
                      <span className="outline-num">{index + 1}</span>
                      <span className="outline-text">{item}</span>
                      <span className="outline-icon">▼</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "fees" && (
              <section className="info-card-modern animate-in">
                <h3 className="section-title-modern">Investment Details</h3>
                <div className="fee-display-grid">
                  <div className="fee-item">
                    <span>Course Fee</span>
                    <h4>USD {course.price}</h4>
                  </div>
                  <div className="fee-item">
                    <span>Duration</span>
                    <h4>{course.duration}</h4>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* 3. Right Column: Sidebar */}
        <aside className="content-right">
          <div className="sticky-enroll-card">
            <div className="lecture-panel-header">
                <h4>Lecture Panel</h4>
                <p>Available 24/7 for your support</p>
            </div>
            
            <button className="premium-enroll-btn">Enroll Now</button>

            <div className="sidebar-features">
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

export default CoursePage;