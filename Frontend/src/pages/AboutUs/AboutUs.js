import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Our Purpose Section */}
      <div className="purpose-section">
        <p className="purpose-text">Our Purpose</p>
        <h1 className="mission-title">Our Mission</h1>
        <p className="mission-description">
          To democratize high-quality education by connecting world-class mentors<br />
          with ambitious learners globally, fostering a culture of continuous<br />
          growth and innovation
        </p>
      </div>

      {/* Our Story Section */}
      <div className="story-section">
        <div className="story-container">
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" 
              alt="Our Story"
            />
          </div>
          <div className="story-content">
            <h2 className="story-title">Our Story</h2>
            <p className="story-text">
              Founded in 2018, LearnX began with a simple observation: the gap between traditional 
              education and industry requirements was widening. Our founders, a team of tech veterans 
              and educators, set out to build a platform that focuses on practical, project-based learning. 
              What started as a small group of mentors has grown into a global community of over 10,000 
              students and hundreds of expert instructors from top companies. We've stayed true to our 
              roots, ensuring every course is led by someone who actually does the work they teach.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="values-section">
        <h2 className="values-title">Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" 
              alt="Excellence"
            />
          </div>
          <div className="value-item">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop" 
              alt="Innovation"
            />
          </div>
          <div className="value-item">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop" 
              alt="Community"
            />
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="leadership-section">
        <h2 className="leadership-title">Meet Our Leadership</h2>
        <p className="leadership-subtitle">The visionaries behind our educational revolution</p>
        
        <div className="leadership-grid">
          <div className="leader-card">
            <div className="leader-image">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop" 
                alt="Sarah Mitchell"
              />
            </div>
            <h3 className="leader-name">Sarah Mitchell</h3>
            <p className="leader-role">Co-founder & CEO</p>
          </div>

          <div className="leader-card">
            <div className="leader-image">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop" 
                alt="David Chen"
              />
            </div>
            <h3 className="leader-name">David Chen</h3>
            <p className="leader-role">Co-founder & CTO</p>
          </div>

          <div className="leader-card">
            <div className="leader-image">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop" 
                alt="Emily Rodriguez"
              />
            </div>
            <h3 className="leader-name">Emily Rodriguez</h3>
            <p className="leader-role">Head of Education</p>
          </div>

          <div className="leader-card">
            <div className="leader-image">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" 
                alt="Michael Thompson"
              />
            </div>
            <h3 className="leader-name">Michael Thompson</h3>
            <p className="leader-role">Strategic Operations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;