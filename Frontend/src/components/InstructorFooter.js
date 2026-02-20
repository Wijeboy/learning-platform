import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import './InstructorFooter.css';

const InstructorFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="instructor-footer">
      <div className="instructor-footer-container">
        <div className="instructor-footer-content">
          <div className="instructor-footer-section">
            <h3>Instructor Resources</h3>
            <ul className="footer-links">
              <li><a href="/instructor/help">Help Center</a></li>
              <li><a href="/instructor/guidelines">Teaching Guidelines</a></li>
              <li><a href="/instructor/best-practices">Best Practices</a></li>
              <li><a href="/instructor/community">Community Forum</a></li>
            </ul>
          </div>

          <div className="instructor-footer-section">
            <h3>Tools & Support</h3>
            <ul className="footer-links">
              <li><a href="/instructor/video-resources">Video Resources</a></li>
              <li><a href="/instructor/course-builder">Course Builder</a></li>
              <li><a href="/instructor/analytics">Analytics Tools</a></li>
              <li><a href="/instructor/support">Technical Support</a></li>
            </ul>
          </div>

          <div className="instructor-footer-section">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <FiMail className="contact-icon" />
                <span>instructors@learnx.com</span>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>123 Education St, Learning City</span>
              </li>
            </ul>
          </div>

          <div className="instructor-footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiInstagram />
              </a>
            </div>
            <p className="footer-cta">Empowering educators worldwide</p>
          </div>
        </div>

        <div className="instructor-footer-bottom">
          <p>&copy; {currentYear} LearnX Instructor Portal. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="/terms">Terms of Service</a>
            <span className="separator">|</span>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InstructorFooter;
