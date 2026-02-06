import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerStudent, checkEmailExists } from '../services/authService';
import { countries, validatePhoneNumber } from '../utils/phoneValidation';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: 'LK',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [validation, setValidation] = useState({
    firstName: { valid: true, message: '' },
    lastName: { valid: true, message: '' },
    phoneNumber: { valid: true, message: '' },
    email: { valid: true, message: '', checking: false },
    password: { valid: true, message: '' },
    confirmPassword: { valid: true, message: '' }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailCheckTimeout, setEmailCheckTimeout] = useState(null);

  // Real-time First Name Validation
  const validateFirstName = (value) => {
    if (!value.trim()) {
      return { valid: false, message: 'First name is required' };
    }
    if (value.length < 2) {
      return { valid: false, message: 'First name must be at least 2 characters' };
    }
    if (value.length > 30) {
      return { valid: false, message: 'First name cannot exceed 30 characters' };
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return { valid: false, message: 'First name can only contain letters' };
    }
    return { valid: true, message: '' };
  };

  // Real-time Last Name Validation
  const validateLastName = (value) => {
    if (!value.trim()) {
      return { valid: false, message: 'Last name is required' };
    }
    if (value.length < 2) {
      return { valid: false, message: 'Last name must be at least 2 characters' };
    }
    if (value.length > 30) {
      return { valid: false, message: 'Last name cannot exceed 30 characters' };
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return { valid: false, message: 'Last name can only contain letters' };
    }
    return { valid: true, message: '' };
  };

  // Real-time Email Validation
  const validateEmail = (value) => {
    if (!value.trim()) {
      return { valid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { valid: false, message: 'Please enter a valid email' };
    }
    return { valid: true, message: '' };
  };

  // Real-time Password Validation
  const validatePassword = (value) => {
    if (!value) {
      return { valid: false, message: 'Password is required' };
    }
    if (value.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/(?=.*\d)/.test(value)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: '' };
  };

  // Real-time Confirm Password Validation
  const validateConfirmPassword = (value, password) => {
    if (!value) {
      return { valid: false, message: 'Please confirm your password' };
    }
    if (value !== password) {
      return { valid: false, message: 'Passwords do not match' };
    }
    return { valid: true, message: '' };
  };

  // Check email exists in database (debounced)
  useEffect(() => {
    if (formData.email && validation.email.valid) {
      // Clear previous timeout
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }

      // Set checking state
      setValidation(prev => ({
        ...prev,
        email: { ...prev.email, checking: true }
      }));

      // Set new timeout for API call
      const timeout = setTimeout(async () => {
        try {
          const exists = await checkEmailExists(formData.email);
          if (exists) {
            setValidation(prev => ({
              ...prev,
              email: { valid: false, message: 'This email is already registered', checking: false }
            }));
          } else {
            setValidation(prev => ({
              ...prev,
              email: { valid: true, message: '✓ Email is available', checking: false }
            }));
          }
        } catch (err) {
          setValidation(prev => ({
            ...prev,
            email: { ...prev.email, checking: false }
          }));
        }
      }, 800);

      setEmailCheckTimeout(timeout);
    }

    return () => {
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
    };
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    // Real-time validation
    if (name === 'firstName') {
      setValidation(prev => ({ ...prev, firstName: validateFirstName(value) }));
    } else if (name === 'lastName') {
      setValidation(prev => ({ ...prev, lastName: validateLastName(value) }));
    } else if (name === 'phoneNumber') {
      const phoneValidation = validatePhoneNumber(value, formData.countryCode);
      setValidation(prev => ({ ...prev, phoneNumber: phoneValidation }));
    } else if (name === 'email') {
      const emailValidation = validateEmail(value);
      setValidation(prev => ({ ...prev, email: emailValidation }));
    } else if (name === 'password') {
      setValidation(prev => ({ 
        ...prev, 
        password: validatePassword(value),
        confirmPassword: formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword, value) : prev.confirmPassword
      }));
    } else if (name === 'confirmPassword') {
      setValidation(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value, formData.password) }));
    } else if (name === 'countryCode') {
      if (formData.phoneNumber) {
        const phoneValidation = validatePhoneNumber(formData.phoneNumber, value);
        setValidation(prev => ({ ...prev, phoneNumber: phoneValidation }));
      }
    }

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate all fields
    const firstNameValidation = validateFirstName(formData.firstName);
    const lastNameValidation = validateLastName(formData.lastName);
    const phoneValidation = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(formData.confirmPassword, formData.password);

    setValidation({
      firstName: firstNameValidation,
      lastName: lastNameValidation,
      phoneNumber: phoneValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation
    });

    // Check if any validation failed
    if (!firstNameValidation.valid || !lastNameValidation.valid || !phoneValidation.valid || 
        !emailValidation.valid || !passwordValidation.valid || !confirmPasswordValidation.valid) {
      setError('Please fix all validation errors before submitting');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms & policy');
      return;
    }

    setLoading(true);

    try {
      // Check email one more time before registration
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError('This email is already registered');
        setValidation(prev => ({
          ...prev,
          email: { valid: false, message: 'This email is already registered', checking: false }
        }));
        setLoading(false);
        return;
      }

      const response = await registerStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
        countryCode: formData.countryCode,
        password: formData.password
      });

      setSuccess('Registration successful! Redirecting...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };

  const handleAppleSignIn = () => {
    console.log('Sign in with Apple');
  };

  const selectedCountry = countries.find(c => c.code === formData.countryCode);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Get Started Now</h2>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={!validation.firstName.valid ? 'input-error' : ''}
                  required
                />
                {!validation.firstName.valid && (
                  <span className="error-message">{validation.firstName.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={!validation.lastName.valid ? 'input-error' : ''}
                  required
                />
                {!validation.lastName.valid && (
                  <span className="error-message">{validation.lastName.message}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="phone-input-group">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="country-select"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={selectedCountry?.format || "Enter phone number"}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={!validation.phoneNumber.valid ? 'input-error' : ''}
                  required
                />
              </div>
              {!validation.phoneNumber.valid && (
                <span className="error-message">{validation.phoneNumber.message}</span>
              )}
              {selectedCountry && (
                <span className="input-hint">Format: {selectedCountry.format} ({selectedCountry.length} digits)</span>
              )}
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
                className={!validation.email.valid ? 'input-error' : validation.email.message.includes('✓') ? 'input-success' : ''}
                required
              />
              {validation.email.checking && (
                <span className="checking-message">Checking availability...</span>
              )}
              {!validation.email.checking && !validation.email.valid && (
                <span className="error-message">{validation.email.message}</span>
              )}
              {!validation.email.checking && validation.email.valid && validation.email.message && (
                <span className="success-message">{validation.email.message}</span>
              )}
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
                className={!validation.password.valid ? 'input-error' : ''}
                required
              />
              {!validation.password.valid && (
                <span className="error-message">{validation.password.message}</span>
              )}
              <span className="input-hint">Must contain uppercase, lowercase, and number (min 6 characters)</span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={!validation.confirmPassword.valid ? 'input-error' : formData.confirmPassword && validation.confirmPassword.valid ? 'input-success' : ''}
                required
              />
              {!validation.confirmPassword.valid && formData.confirmPassword && (
                <span className="error-message">{validation.confirmPassword.message}</span>
              )}
              {validation.confirmPassword.valid && formData.confirmPassword && (
                <span className="success-message">✓ Passwords match</span>
              )}
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

            <button type="submit" className="btn-create-account" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
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
    </div>
  );
};

export default SignUp;
