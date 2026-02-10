import React from 'react';
import './InstructorDetails.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";


const InstructorDetails = () => {
  return (
    <div className="page-wrapper">
      {/* Breadcrumb Area */}
       {/* 1. HEADER / BREADCRUMB */}
      <header className="page-header">
        <div className="container">
          <h1>Instructor Profile</h1>
          <p>Home / <span>Instructor Profile</span></p>
        </div>
      </header>

      <div className="container">
        {/* 1. Profile Header Card */}
        <section className="profile-header-card">
          <div className="profile-image-wrapper">
             <img src="https://imgs.search.brave.com/r8k-QX4T7rxSm5w-OnRF2ZktXe_rr3w0TRqwVjr2DoM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDQu/ZGVwb3NpdHBob3Rv/cy5jb20vMTMxOTM2/NTgvMjc4MjMvaS80/NTAvZGVwb3NpdHBo/b3Rvc18yNzgyMzI2/MzYtc3RvY2stcGhv/dG8tYXR0cmFjdGl2/ZS1zZXJpb3VzLWxl/Y3R1cmVyLWdlc3R1/cmluZy13aGlsZS5q/cGc" alt="Jason Bell" className="profile-img" />
          </div>
          <div className="profile-info">
            <h2>Jason Bell</h2>
            <p className="job-title">Expert Web Design</p>
            <div className="meta-info">
              <span className="meta-item">
                <span className="meta-label">Rating:</span>
                <span className="meta-value">4.8 (420 Reviews)</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Email:</span>
                <span className="meta-value">bell@gmail.com</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Phone:</span>
                <span className="meta-value">+123 9500 600</span>
              </span>
            </div>
            <p className="bio">
              I don't just teach you how to code; I teach you how to think like an engineer. 
              With 10+ years of shipping production-ready React apps, I'll show you the 
              shortcuts the pros use and the pitfalls that break junior devs.
            </p>
            <div className="social-icons">
              <button className="icon-btn fb">
                <FaFacebookF size={18} color="white" />
              </button>
              <button className="icon-btn tw">
                <FaTwitter size={18} color="white" />
              </button>
              <button className="icon-btn ln">
                <FaLinkedinIn size={18} color="white" />
              </button>
              <button className="icon-btn yt">
                <FaYoutube size={18} color="white" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. Main Content Layout */}
        <div className="instructor-layout">
          <div className="details-left">
            <section className="info-box">
              <h3>Why Learn From Jason?</h3>
              <ul>
                <li><strong>Industry-First Approach:</strong> Learn the exact workflows used at companies like Meta and Netflix—from Git flow to CI/CD.</li>
                <li><strong>Modern Tech Stack:</strong> No outdated tutorials. Master 2026 standards including Next.js 16, TypeScript, and AI-assisted coding.</li>
                <li><strong>Project-Based Learning:</strong>  Every course ends with a production-ready application for your portfolio, not just a "Todo List."</li>
              </ul>
            </section>

            <section className="info-box">
              <h3>Expertise & Stack</h3>
              <ul>
                <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS, Framer Motion.</li>
                <li><strong>Backend:</strong> Node.js, PostgreSQL, GraphQL, Supabase.</li>
                <li><strong>DevOps:</strong> Docker, AWS, Vercel, Serverless Architecture.</li>
                
              </ul>
            </section>
          </div>

          {/* 3. Contact Sidebar */}
          <aside className="contact-sidebar">
            <div className="contact-card">
              <h3>Quick Contact</h3>
              <p>Feel free to contact us through Twitter or Facebook if you prefer!</p>
              <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="E-mail" />
                <input type="text" placeholder="Topic" />
                <input type="tel" placeholder="Phone" />
                <textarea placeholder="Message"></textarea>
                <button type="submit" className="btn-send">Send Message </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;