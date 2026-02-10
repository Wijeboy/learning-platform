import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { updateInstructorProfile, uploadInstructorProfilePhoto } from '../../../services/instructorService';
import './InstructorProfile.css';

const InstructorProfile = () => {
  const { user, isAuth, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        countryCode: user.countryCode || '+1',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Set profile photo preview
      if (user.profilePhoto) {
        setPhotoPreview(`http://localhost:5001${user.profilePhoto}`);
      }
    }
  }, [user]);

  // Redirect only after auth state is fully initialized
  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (!isAuth || user?.userType !== 'instructor') {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  // Show loading while auth is being checked
  if (user === null) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccessMessage('');
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (name === 'firstName') {
      if (!value.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (value.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors.firstName = 'First name can only contain letters';
      } else {
        delete newErrors.firstName;
      }
    }
    
    if (name === 'lastName') {
      if (!value.trim()) {
        newErrors.lastName = 'Last name is required';
      } else if (value.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors.lastName = 'Last name can only contain letters';
      } else {
        delete newErrors.lastName;
      }
    }
    
    if (name === 'countryCode') {
      if (!value.trim()) {
        newErrors.countryCode = 'Country code is required';
      } else if (!/^\+\d{1,4}$/.test(value)) {
        newErrors.countryCode = 'Invalid country code format (e.g., +1, +94)';
      } else {
        delete newErrors.countryCode;
      }
    }
    
    if (name === 'phoneNumber') {
      const cleanedNumber = value.replace(/[\s-]/g, '');
      if (!value.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^[0-9]{9,11}$/.test(cleanedNumber)) {
        newErrors.phoneNumber = 'Phone number must be 9-11 digits';
      } else {
        delete newErrors.phoneNumber;
      }
    }
    
    if (name === 'newPassword') {
      if (value && value.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      } else {
        delete newErrors.newPassword;
      }
    }
    
    if (name === 'confirmPassword') {
      if (value !== formData.newPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }
    
    setErrors(newErrors);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ photo: 'Please select an image file' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ photo: 'Image size should be less than 5MB' });
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      setLoading(true);
      setErrors({});
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await uploadInstructorProfilePhoto(formData);
      
      // Backend returns { success, message, profilePhoto }
      const photoPath = response.profilePhoto;
      
      // Update user in context with photo and preserve all user data
      const updatedUser = { 
        ...user,
        profilePhoto: photoPath,
        token: user.token,
        userType: user.userType
      };
      
      // Store updated user data in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      if (user.token) {
        localStorage.setItem('token', user.token);
      }
      
      // Update context
      login(updatedUser);
      
      setSuccessMessage('Profile photo updated successfully!');
      setPhotoPreview(`http://localhost:5001${photoPath}`);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setErrors({ photo: error.message || 'Failed to upload photo' });
      // Reset preview on error
      setPhotoPreview(user?.profilePhoto ? `http://localhost:5001${user.profilePhoto}` : null);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters';
    }

    // Country code validation
    if (!formData.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    } else if (!/^\+\d{1,4}$/.test(formData.countryCode)) {
      newErrors.countryCode = 'Invalid country code format (e.g., +1, +94)';
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{9,11}$/.test(formData.phoneNumber.replace(/[\s-]/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 9-11 digits';
    }

    // Password validation only if user wants to change it
    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        countryCode: formData.countryCode
      };

      // Only include password fields if user wants to change password
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await updateInstructorProfile(updateData);
      
      // Update user in context with token preserved
      const updatedUser = {
        ...response.instructor,
        token: user.token,
        userType: user.userType
      };
      
      // Store updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      login(updatedUser);
      
      setSuccessMessage('Profile updated successfully!');
      
      // Clear password fields
      setFormData({
        ...formData,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        countryCode: updatedUser.countryCode,
        email: updatedUser.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: error.message || 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="instructor-profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Update your personal information and password</p>
      </div>

      <div className="profile-content">
        <div className="profile-photo-section">
          <div className="photo-container">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-photo-placeholder">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
            )}
          </div>
          <div className="photo-actions">
            <label htmlFor="photo-upload" className="btn-upload">
              Change Photo
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <p className="photo-hint">JPG, PNG or GIF. Max size 5MB</p>
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {successMessage && (
            <div className="success-banner">{successMessage}</div>
          )}
          {errors.submit && (
            <div className="error-banner">{errors.submit}</div>
          )}

          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email * (Cannot be changed)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                className="disabled-input"
              />
              <p className="field-hint">Email is unique and cannot be changed</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="countryCode">Country Code *</label>
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className={errors.countryCode ? 'error' : ''}
                >
                  <option value="+1">+1 (USA/Canada)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+94">+94 (Sri Lanka)</option>
                  <option value="+81">+81 (Japan)</option>
                  <option value="+86">+86 (China)</option>
                  <option value="+33">+33 (France)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+39">+39 (Italy)</option>
                  <option value="+34">+34 (Spain)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+65">+65 (Singapore)</option>
                  <option value="+60">+60 (Malaysia)</option>
                  <option value="+62">+62 (Indonesia)</option>
                  <option value="+63">+63 (Philippines)</option>
                  <option value="+66">+66 (Thailand)</option>
                  <option value="+82">+82 (South Korea)</option>
                  <option value="+977">+977 (Nepal)</option>
                  <option value="+880">+880 (Bangladesh)</option>
                  <option value="+92">+92 (Pakistan)</option>
                </select>
                {errors.countryCode && <span className="error-message">{errors.countryCode}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? 'error' : ''}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Change Password</h2>
            <p className="section-hint">Leave blank if you don't want to change your password</p>
            
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? 'error' : ''}
              />
              {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={errors.newPassword ? 'error' : ''}
                  placeholder="Min 6 characters"
                />
                {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/instructor/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorProfile;
