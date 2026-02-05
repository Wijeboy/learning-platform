import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGraduationCap } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: About LearnX */}
        <div className="footer-section">
          <div className="footer-brand">
            <FaGraduationCap className="footer-brand-icon" />
            <h3 className="footer-brand-text">LearnX</h3>
          </div>
          <p className="footer-description">
            Empowering professionals worldwide with the skills of tomorrow. Start your journey with our expert mentors today.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Section 2: Useful Links */}
        <div className="footer-section">
          <h3 className="footer-title">Useful Links</h3>
          <ul className="footer-links">
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/pricing">Pricing Plans</Link></li>
            <li><Link to="/faq">FAQ & Help Centre</Link></li>
            <li><Link to="/stories">Student Stories</Link></li>
          </ul>
        </div>

        {/* Section 3: Our Company */}
        <div className="footer-section">
          <h3 className="footer-title">Our Company</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Section 4: Get in Touch */}
        <div className="footer-section">
          <h3 className="footer-title">Get in Touch</h3>
          <ul className="footer-contact">
            <li>
              <MdEmail className="contact-icon" />
              <span>support@LearnX.com</span>
            </li>
            <li>
              <MdPhone className="contact-icon" />
              <span>011-2234986</span>
            </li>
            <li>
              <MdLocationOn className="contact-icon" />
              <span>123, Reed Avenue, Colombo 06</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p className="footer-copyright">© 2026 LearnX. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;