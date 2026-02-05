const Student = require('../models/Student');
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
    const { name, email, phoneNumber, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !phoneNumber || !password) {
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
      name,
      email,
      phoneNumber,
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
        name: student.name,
        email: student.email,
        phoneNumber: student.phoneNumber,
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

// @desc    Login student
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

    // Find student and include password
    const student = await Student.findOne({ email }).select('+password');

    // Check if student exists and password is correct
    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!student.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Generate token
    const token = generateToken(student._id);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: student._id,
        name: student.name,
        email: student.email,
        phoneNumber: student.phoneNumber,
        role: student.role,
        token
      }
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
