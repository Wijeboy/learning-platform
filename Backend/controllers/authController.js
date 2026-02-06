const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, countryCode, password } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !phoneNumber || !countryCode || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create student
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

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student',
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

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
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

    // Add profilePhoto for admins
    if (userType === 'admin' && user.profilePhoto) {
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
