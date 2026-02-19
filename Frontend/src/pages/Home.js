import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBook, FaCertificate, FaGraduationCap, FaCalendar, FaUserCircle, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { IoBookSharp, IoTime, IoStatsChart } from 'react-icons/io5';
import { MdSchool, MdLightbulb, MdComputer } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();
  
  // Counter animation state
  const [counters, setCounters] = useState({
    courses: 0,
    tutors: 0,
    students: 0
  });

  // Redirect logged-in users to their dashboards
  useEffect(() => {
    if (isAuth && user) {
      if (user.userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.userType === 'student') {
        navigate('/student/dashboard');
      } else if (user.userType === 'instructor') {
        navigate('/instructor/dashboard');
      }
    }
  }, [isAuth, user, navigate]);

  // Counter animation
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = {
        courses: 250,
        tutors: 50,
        students: 20000
      };

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          courses: Math.floor(targets.courses * progress),
          tutors: Math.floor(targets.tutors * progress),
          students: Math.floor(targets.students * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Sample course data
  const latestCourses = [
    {
      id: 1,
      title: 'Learning Javascript with Imagination',
      instructor: 'Robert Fox',
      price: 15,
      category: 'Business',
      lessons: '05',
      duration: '8h 20m',
      level: 'Expert',
      image: '/course1.png'
    },
    {
      id: 2,
      title: 'Advanced React Development',
      instructor: 'Jane Smith',
      price: 20,
      category: 'Tech',
      lessons: '08',
      duration: '12h 30m',
      level: 'Expert',
      image: '/course2.png'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Johnson',
      price: 18,
      category: 'Web',
      lessons: '06',
      duration: '10h 15m',
      level: 'Expert',
      image: '/course3.png'
    },
    {
      id: 4,
      title: 'Digital Marketing Essentials',
      instructor: 'Sarah Williams',
      price: 12,
      category: 'Business',
      lessons: '04',
      duration: '6h 45m',
      level: 'Expert',
      image: '/course4.png'
    }
  ];

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: 'Get Started With UI Design With Tips To Speed',
      category: 'Marketing',
      date: '20, July 2026',
      author: 'admin',
      image: '/blog1.png'
    },
    {
      id: 2,
      title: 'Best Practices for Modern Web Development',
      category: 'Technology',
      date: '02, March 2026',
      author: 'admin',
      image: '/blog2.png'
    },
    {
      id: 3,
      title: 'The Future of Online Learning Platforms',
      category: 'Web',
      date: '10, June 2026',
      author: 'admin',
      image: '/blog3.png'
    },
    {
      id: 4,
      title: 'How to Build a Successful Career in Tech',
      category: 'Career',
      date: '28, August 2026',
      author: 'admin',
      image: '/blog4.png'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: 'url(/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div className="hero-content">
          <div className="hero-text-box">
            <h1 className="hero-title">
              Unlock your potential with expert-led courses
            </h1>
            <p className="hero-description">
              Join over 10,000 students learning the most in-demand skills in technology, business, and design with our industry-leading professional mentors
            </p>
            <Link to="/courses" className="btn-view-catalogue">
              View Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">EVERYTHING YOU NEED TO LEARN SMARTER</h2>
        <p className="section-subtitle">
          Small features that support your goals, from your first lesson to mastery and a complete set of tools built to enhance focus, progress and results
        </p>

        <div className="features-cards">
          <div className="feature-card feature-card-teal">
            <FaUser className="feature-icon feature-icon-teal" />
            <h3 className="feature-title">Expert Tutors</h3>
            <p className="feature-description">
              Learn from industry leaders with proven track records
            </p>
          </div>

          <div className="feature-card feature-card-purple">
            <FaBook className="feature-icon feature-icon-purple" />
            <h3 className="feature-title">Effective Courses</h3>
            <p className="feature-description">
              Transform your knowledge into actionable skills
            </p>
          </div>

          <div className="feature-card feature-card-orange">
            <FaCertificate className="feature-icon feature-icon-orange" />
            <h3 className="feature-title">Earn Certificate</h3>
            <p className="feature-description">
              Validate your skills with an industry-recognized credential
            </p>
          </div>
        </div>
      </section>

      {/* Discover Courses Section */}
      <section className="discover-section">
        <MdSchool className="discover-icon discover-icon-1" />
        <MdLightbulb className="discover-icon discover-icon-2" />
        <MdComputer className="discover-icon discover-icon-3" />
        <FaGraduationCap className="discover-icon discover-icon-4" />

        <div className="discover-content">
          <div className="discover-text">
            <h2 className="discover-title">Discover Our Top Courses</h2>
            <p className="discover-description">
              Explore expertly designed courses tailored to today's in-demand skills. Learn at your own pace with guidance from experienced instructors. Start building your future with confidence
            </p>

            <div className="discover-features">
              <div className="discover-feature-item">
                <FaGraduationCap className="discover-feature-icon" />
                <span>The Most World Class Instructors</span>
              </div>
              <div className="discover-feature-item">
                <FaGraduationCap className="discover-feature-icon" />
                <span>Access Your Class Anywhere</span>
              </div>
              <div className="discover-feature-item">
                <FaGraduationCap className="discover-feature-icon" />
                <span>Flexible Course Plan</span>
              </div>
            </div>

            <Link to="/courses" className="btn-view-all-courses">
              View All Courses
            </Link>
          </div>

          <div className="discover-image">
            <img src="/discover-courses.png" alt="Discover Courses" />
          </div>
        </div>
      </section>

      {/* Latest Courses Section */}
      <section className="latest-courses-section">
        <h2 className="latest-courses-title">Latest Courses, Just Launched...</h2>
        
        <div className="courses-grid">
          {latestCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-content">
                <div className="course-header">
                  <span className="course-category">{course.category}</span>
                  <span className="course-price">${course.price}</span>
                </div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">{course.instructor}</p>
                <div className="course-divider"></div>
                <div className="course-meta">
                  <div className="course-meta-item">
                    <IoBookSharp className="course-meta-icon" />
                    <span>{course.lessons}</span>
                  </div>
                  <div className="course-meta-item">
                    <IoTime className="course-meta-icon" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="course-meta-item">
                    <IoStatsChart className="course-meta-icon" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="statistics-content">
          <div className="stat-item">
            <h3 className="stat-number">{counters.courses}+</h3>
            <p className="stat-label">Active Courses</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number">{counters.tutors}+</h3>
            <p className="stat-label">Expert Tutors</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number">{counters.students.toLocaleString()}+</h3>
            <p className="stat-label">Enrolled Students</p>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="instructors-section">
        <div className="instructors-image">
          <img src="/instructor-image.png" alt="Meet Instructors" />
        </div>
        <div className="instructors-content">
          <h2 className="instructors-title">Meet Your Instructors, Learn From the Pros</h2>
          <p className="instructors-subtitle">
            Gain insights from professionals who practice what they teach
          </p>
          <h3 className="instructors-question">What You'll Gain?</h3>
          <p className="instructors-description">
            We provide high quality courses designed to help you build real, practical skills. Learn from experienced instructors and follow structured lessons made for clear progress. Our platform supports your journey from start to success
          </p>
          <Link to="/instructors" className="btn-expert-panel">
            View Our Expert Panel
          </Link>
        </div>
      </section>

      {/* Events Banner */}
      <section 
        className="events-banner"
        style={{
          backgroundImage: 'url(/events-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          margin: '60px 0'
        }}
      >
        <div 
          style={{
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 51, 0.5)',
            zIndex: 0
          }}
        ></div>
        <div className="events-content" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="events-title">
            Want to stay informed about what's on our Event Calendar?
          </h2>
          <Link to="/events" className="btn-see-events">
            See All Events
          </Link>
        </div>
      </section>

      {/* Join Section - Only for Guest Users */}
      {!isAuth && (
        <section className="join-section">
          <h2 className="join-title">Ready to Join & Explore More?</h2>
          
          <div className="join-cards">
            <div className="join-card">
              <FaUserGraduate className="join-icon" />
              <div className="join-card-content">
                <h3 className="join-card-title">Join as a Student</h3>
                <p className="join-card-description">
                  Start your learning journey with LearnX
                </p>
                <Link to="/signup" className="btn-join">
                  Register Now
                </Link>
              </div>
            </div>

            <div className="join-card">
              <FaChalkboardTeacher className="join-icon" />
              <div className="join-card-content">
                <h3 className="join-card-title">Become an Instructor</h3>
                <p className="join-card-description">
                  Shape the future of learning through LearnX
                </p>
                <Link to="/signup" className="btn-join">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Feed Section */}
      <section className="news-section">
        <h2 className="news-title">OUR LATEST NEWS FEED</h2>
        <p className="news-subtitle">See what's happening now</p>

        <div className="news-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="news-card">
              <div className="news-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="news-content">
                <span className="news-category">{post.category}</span>
                <div className="news-meta">
                  <div className="news-meta-item">
                    <FaCalendar className="news-meta-icon" />
                    <span>{post.date}</span>
                  </div>
                  <div className="news-meta-item">
                    <FaUserCircle className="news-meta-icon" />
                    <span>by {post.author}</span>
                  </div>
                </div>
                <h3 className="news-title-text">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;