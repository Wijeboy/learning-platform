const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register a new student or instructor
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, countryCode, password, userType } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !phoneNumber || !countryCode || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if email already exists in any collection
    const existingStudent = await Student.findOne({ email });
    const existingInstructor = await Instructor.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingStudent || existingInstructor || existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // If registering as instructor
    if (userType === 'instructor') {
      const instructor = await Instructor.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        password,
        isActive: false,
        approvalStatus: 'pending'
      });

      res.status(201).json({
        success: true,
        message: 'Instructor application submitted successfully. Please wait for admin approval.',
        data: {
          id: instructor._id,
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          email: instructor.email,
          role: instructor.role,
          approvalStatus: instructor.approvalStatus
        }
      });
    } else {
      // Create student (default)
      const student = await Student.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        password
      });

      // Generate token
      const token = generateToken(student._id);

      // Send response
      res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        data: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phoneNumber: student.phoneNumber,
          countryCode: student.countryCode,
          role: student.role,
          token
        }
      });
    }

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message
    });
  }
};

// @desc    Login student, instructor, or admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Try to find user in all collections
    let user = null;
    let userType = null;

    // Check Admin first
    user = await Admin.findOne({ email }).select('+password');
    if (user) {
      userType = 'admin';
    }

    // Check Instructor if not admin
    if (!user) {
      user = await Instructor.findOne({ email }).select('+password');
      if (user) {
        userType = 'instructor';
      }
    }

    // Check Student if not admin or instructor
    if (!user) {
      user = await Student.findOne({ email }).select('+password');
      if (user) {
        userType = 'student';
      }
    }

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check instructor approval status BEFORE isActive check
    if (userType === 'instructor') {
      console.log('Instructor login attempt - approvalStatus:', user.approvalStatus, 'isActive:', user.isActive);
      
      // If approvalStatus doesn't exist (old records), treat as pending
      if (!user.approvalStatus || user.approvalStatus === 'pending') {
        return res.status(403).json({
          success: false,
          message: 'Your instructor application is pending admin approval'
        });
      }
      
      if (user.approvalStatus === 'declined') {
        return res.status(403).json({
          success: false,
          message: 'Your instructor application has been declined'
        });
      }

      // Check if account is active for instructors
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Your account has been deactivated by admin'
        });
      }
    } else {
      // Check if account is active for students and admins
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated'
        });
      }
    }

    // Generate token
    const token = generateToken(user._id);

    // Build response data based on user type
    const responseData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userType: userType,
      token
    };

    // Add profilePhoto if it exists
    if (user.profilePhoto) {
      responseData.profilePhoto = user.profilePhoto;
    }

    // Add phone number for students and instructors
    if (user.phoneNumber) {
      responseData.phoneNumber = user.phoneNumber;
      responseData.countryCode = user.countryCode;
    }

    // Send response with user type
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: responseData
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// @desc    Get current student profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// @desc    Check if email exists
// @route   POST /api/auth/check-email
// @access  Public
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email'
      });
    }

    const existingStudent = await Student.findOne({ email });

    res.status(200).json({
      success: true,
      exists: !!existingStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking email',
      error: error.message
    });
  }
};

// @desc    Update student profile
// @route   PUT /api/auth/update-profile
// @access  Private (Student only)
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, countryCode } = req.body;

    console.log('Update profile request:', { firstName, lastName, phoneNumber, countryCode });

    // Find the Model
    let Model;

    if (req.user.userType === 'student') {
      Model = Student;
    } else if (req.user.userType === 'instructor') {
      Model = Instructor;
    } else if (req.user.userType === 'admin') {
      Model = Admin;
    }

    // Prepare update data
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (countryCode) updateData.countryCode = countryCode;

    // Use findByIdAndUpdate to bypass validation issues
    const user = await Model.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: false }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('Profile updated successfully');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        profilePhoto: user.profilePhoto,
        userType: user.role || req.user.userType
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Update profile photo only
// @route   POST /api/auth/update-photo
// @access  Private
exports.updateProfilePhoto = async (req, res) => {
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

    // Find the user model
    let Model;
    let prefix;

    if (req.user.userType === 'student') {
      Model = Student;
      prefix = 'student';
    } else if (req.user.userType === 'instructor') {
      Model = Instructor;
      prefix = 'instructor';
    } else if (req.user.userType === 'admin') {
      Model = Admin;
      prefix = 'admin';
    }

    const user = await Model.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Delete old photo if exists
    if (user.profilePhoto) {
      const oldPhotoPath = path.join(__dirname, '..', user.profilePhoto);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Create custom filename
    const fileName = `${prefix}_${user._id}_${Date.now()}${path.extname(file.name)}`;
    const uploadPath = path.join(uploadDir, fileName);

    // Move file to uploads directory
    await file.mv(uploadPath);

    // Update profile photo path
    user.profilePhoto = `/uploads/profiles/${fileName}`;
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      profilePhoto: user.profilePhoto
    });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

