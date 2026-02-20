import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createInstructor, checkEmailExists } from '../../services/adminService';
import { countries, validatePhoneNumber } from '../../utils/phoneValidation';
import './CreateUser.css';

const CreateInstructor = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: 'AF',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [emailChecking, setEmailChecking] = useState(false);

  // Real-time validation for firstName
  useEffect(() => {
    if (touched.firstName) {
      if (!formData.firstName.trim()) {
        setErrors(prev => ({ ...prev, firstName: 'First name is required' }));
      } else if (formData.firstName.trim().length < 2) {
        setErrors(prev => ({ ...prev, firstName: 'First name must be at least 2 characters' }));
      } else {
        setErrors(prev => ({ ...prev, firstName: '' }));
      }
    }
  }, [formData.firstName, touched.firstName]);

  // Real-time validation for lastName
  useEffect(() => {
    if (touched.lastName) {
      if (!formData.lastName.trim()) {
        setErrors(prev => ({ ...prev, lastName: 'Last name is required' }));
      } else if (formData.lastName.trim().length < 2) {
        setErrors(prev => ({ ...prev, lastName: 'Last name must be at least 2 characters' }));
      } else {
        setErrors(prev => ({ ...prev, lastName: '' }));
      }
    }
  }, [formData.lastName, touched.lastName]);

  // Real-time email validation with existence check
  useEffect(() => {
    if (touched.email && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
        return;
      }

      // Debounce email check
      const timeoutId = setTimeout(async () => {
        try {
          setEmailChecking(true);
          const result = await checkEmailExists(formData.email);
          if (result.exists) {
            setErrors(prev => ({ ...prev, email: `Email already registered as ${result.userType}` }));
          } else {
            setErrors(prev => ({ ...prev, email: '' }));
          }
        } catch (error) {
          console.error('Email check error:', error);
        } finally {
          setEmailChecking(false);
        }
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [formData.email, touched.email]);

  // Real-time phone number validation
  useEffect(() => {
    if (touched.phoneNumber && formData.phoneNumber) {
      const phoneValidation = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
      if (!phoneValidation.valid) {
        setErrors(prev => ({ ...prev, phoneNumber: phoneValidation.message }));
      } else {
        setErrors(prev => ({ ...prev, phoneNumber: '' }));
      }
    }
  }, [formData.phoneNumber, formData.countryCode, touched.phoneNumber]);

  // Real-time password validation
  useEffect(() => {
    if (touched.password) {
      if (!formData.password) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (formData.password.length < 6) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else if (!/(?=.*[a-z])/.test(formData.password)) {
        setErrors(prev => ({ ...prev, password: 'Password must contain at least one lowercase letter' }));
      } else if (!/(?=.*[A-Z])/.test(formData.password)) {
        setErrors(prev => ({ ...prev, password: 'Password must contain at least one uppercase letter' }));
      } else if (!/(?=.*\d)/.test(formData.password)) {
        setErrors(prev => ({ ...prev, password: 'Password must contain at least one number' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  }, [formData.password, touched.password]);

  // Real-time confirm password validation
  useEffect(() => {
    if (touched.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  }, [formData.password, formData.confirmPassword, touched.confirmPassword]);

  // Check authentication and redirect if needed
  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (!isAuth || user?.userType !== 'admin') {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validateForm = () => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasEmptyFields = !formData.firstName || !formData.lastName || !formData.email || 
                          !formData.phoneNumber || !formData.password || !formData.confirmPassword;
    return !hasErrors && !hasEmptyFields && !emailChecking;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      password: true,
      confirmPassword: true
    });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const selectedCountry = countries.find(c => c.code === formData.countryCode);
      const instructorData = {
        ...formData,
        countryCode: selectedCountry?.dialCode || '+93'
      };
      await createInstructor(instructorData);
      alert('Instructor created successfully!');
      navigate('/admin/manage-instructors');
    } catch (error) {
      console.error('Error creating instructor:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to create instructor. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (user === null) {
    return null;
  }

  if (isAuth && user?.userType !== 'admin') {
    return null;
  }

  return (
    <div className="create-user">
      <div className="create-container">
        <div className="create-header">
          <h1>Create New Instructor</h1>
          <button className="btn-back" onClick={() => navigate('/admin/manage-instructors')}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.firstName && errors.firstName ? 'error' : ''}
              />
              {touched.firstName && errors.firstName && <span className="error-message">{errors.firstName}</span>}
              {touched.firstName && !errors.firstName && formData.firstName && <span className="success-message">✓</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.lastName && errors.lastName ? 'error' : ''}
              />
              {touched.lastName && errors.lastName && <span className="error-message">{errors.lastName}</span>}
              {touched.lastName && !errors.lastName && formData.lastName && <span className="success-message">✓</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'error' : ''}
            />
            {emailChecking && <span className="checking-message">Checking email...</span>}
            {touched.email && !emailChecking && errors.email && <span className="error-message">{errors.email}</span>}
            {touched.email && !emailChecking && !errors.email && formData.email && <span className="success-message">✓</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="countryCode">Country *</label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
                placeholder="Enter phone number"
              />
              {touched.phoneNumber && errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              {touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber && <span className="success-message">✓</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'error' : ''}
                placeholder="Min 6 characters"
              />
              {touched.password && errors.password && <span className="error-message">{errors.password}</span>}
              {touched.password && !errors.password && formData.password && <span className="success-message">✓</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
              />
              {touched.confirmPassword && errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && <span className="success-message">✓</span>}
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading || !validateForm() || emailChecking}>
            {loading ? 'Creating...' : 'Create Instructor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInstructor;
