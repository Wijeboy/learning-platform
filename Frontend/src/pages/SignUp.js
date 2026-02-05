import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms & policy');
      return;
    }
    console.log('Form submitted:', formData);
    // Add your API call here
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    // Add Google OAuth logic here
  };

  const handleAppleSignIn = () => {
    console.log('Sign in with Apple');
    // Add Apple OAuth logic here
  };

  return (
    <div className="signup-page">
      <Navbar />
      
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Get Started Now</h2>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms">I agree to the terms & policy</label>
            </div>

            <button type="submit" className="btn-create-account">
              Create Account
            </button>
          </form>

          <div className="social-signin">
            <button onClick={handleGoogleSignIn} className="btn-social btn-google">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.5818C15.3273 13.3 14.5636 14.3591 13.4182 15.0682V17.5773H16.7364C18.7091 15.8318 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
                <path d="M10 20C12.7 20 14.9636 19.1045 16.7364 17.5773L13.4182 15.0682C12.4636 15.6682 11.2818 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.36364 11.9H0.957273V14.4909C2.71818 17.9591 6.09091 20 10 20Z" fill="#34A853"/>
                <path d="M4.36364 11.9C4.14545 11.3 4.02273 10.6591 4.02273 10C4.02273 9.34091 4.14545 8.7 4.36364 8.1V5.50909H0.957273C0.345455 6.72727 0 8.11818 0 10C0 11.8818 0.345455 13.2727 0.957273 14.4909L4.36364 11.9Z" fill="#FBBC05"/>
                <path d="M10 3.97727C11.4091 3.97727 12.6682 4.48182 13.6727 5.43182L16.6091 2.49545C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.71818 2.04091 0.957273 5.50909L4.36364 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
            
            <button onClick={handleAppleSignIn} className="btn-social btn-apple">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15.3 10.4c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-.1 0-.2 0-.3 0-1.1 0-2.2.7-2.8.7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.2 2.6 2.2h.1c1 0 1.3-.6 2.6-.6s1.6.6 2.7.6h.1c1.1 0 1.8-1.1 2.5-2.1.8-1.2 1.1-2.3 1.1-2.4 0 0-2.2-.8-2.2-3.3m-2.4-7.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.7-.1 1.7.1 1.8.9.1 1.9-.5 2.5-1.3"/>
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          <p className="signin-link">
            Have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
