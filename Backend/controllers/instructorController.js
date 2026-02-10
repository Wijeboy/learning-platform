const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// @desc    Get instructor profile
// @route   GET /api/instructor/profile
// @access  Private (Instructor)
exports.getProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user._id).select('-password');
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: instructor
    });
  } catch (error) {
    console.error('Error getting instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update instructor profile
// @route   PUT /api/instructor/profile
// @access  Private (Instructor)
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, countryCode, currentPassword, newPassword } = req.body;
    
    const instructor = await Instructor.findById(req.user._id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    // Update basic info
    if (firstName) instructor.firstName = firstName;
    if (lastName) instructor.lastName = lastName;
    if (phoneNumber) instructor.phoneNumber = phoneNumber;
    if (countryCode) instructor.countryCode = countryCode;

    // Handle password change
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, instructor.password);
      
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters'
        });
      }

      instructor.password = newPassword; // Will be hashed by pre-save hook
    }

    await instructor.save();

    // Remove password from response
    const instructorData = instructor.toObject();
    delete instructorData.password;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      instructor: instructorData
    });
  } catch (error) {
    console.error('Error updating instructor profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Upload instructor profile photo
// @route   POST /api/instructor/profile/photo
// @access  Private (Instructor)
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a photo'
      });
    }

    const file = req.files.photo;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Photo size should be less than 5MB'
      });
    }

    // Check file type
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    const instructor = await Instructor.findById(req.user._id);
    
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Delete old photo if exists
    if (instructor.profilePhoto) {
      const oldPhotoPath = path.join(__dirname, '..', instructor.profilePhoto);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Create custom filename
    const fileName = `instructor_${instructor._id}_${Date.now()}${path.extname(file.name)}`;
    const uploadPath = path.join(uploadDir, fileName);

    // Move file to uploads directory
    await file.mv(uploadPath);

    // Update instructor profile photo path
    instructor.profilePhoto = `/uploads/profiles/${fileName}`;
    await instructor.save();

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      profilePhoto: instructor.profilePhoto
    });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
