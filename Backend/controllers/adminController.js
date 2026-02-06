const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');

// @desc    Get all users (students, instructors, admins)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    const instructors = await Instructor.find().select('-password');
    const admins = await Admin.find().select('-password');

    res.status(200).json({
      success: true,
      data: {
        students,
        instructors,
        admins
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Create new admin
// @route   POST /api/admin/create-admin
// @access  Private/Admin
exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// @desc    Create new instructor
// @route   POST /api/admin/create-instructor
// @access  Private/Admin
exports.createInstructor = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, countryCode, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !countryCode || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if instructor already exists
    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const instructor = await Instructor.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Instructor created successfully',
      data: {
        id: instructor._id,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email,
        role: instructor.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating instructor',
      error: error.message
    });
  }
};

// @desc    Update user (student/instructor/admin)
// @route   PUT /api/admin/users/:userType/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { userType, id } = req.params;
    const updates = req.body;

    let Model;
    if (userType === 'student') Model = Student;
    else if (userType === 'instructor') Model = Instructor;
    else if (userType === 'admin') Model = Admin;
    else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type'
      });
    }

    const user = await Model.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// @desc    Delete user (student/instructor/admin)
// @route   DELETE /api/admin/users/:userType/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const { userType, id } = req.params;

    let Model;
    if (userType === 'student') Model = Student;
    else if (userType === 'instructor') Model = Instructor;
    else if (userType === 'admin') Model = Admin;
    else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type'
      });
    }

    const user = await Model.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// @desc    Toggle user active status
// @route   PATCH /api/admin/users/:userType/:id/toggle-status
// @access  Private/Admin
exports.toggleUserStatus = async (req, res) => {
  try {
    const { userType, id } = req.params;

    let Model;
    if (userType === 'student') Model = Student;
    else if (userType === 'instructor') Model = Instructor;
    else if (userType === 'admin') Model = Admin;
    else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type'
      });
    }

    const user = await Model.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: user.isActive }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling user status',
      error: error.message
    });
  }
};
