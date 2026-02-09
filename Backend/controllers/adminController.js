const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');

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

// @desc    Check if email exists in any user collection
// @route   GET /api/admin/check-email/:email
// @access  Private/Admin
exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.params;

    // Check in all three collections
    const studentExists = await Student.findOne({ email });
    const instructorExists = await Instructor.findOne({ email });
    const adminExists = await Admin.findOne({ email });

    const exists = !!(studentExists || instructorExists || adminExists);

    res.status(200).json({
      success: true,
      exists,
      userType: studentExists ? 'student' : instructorExists ? 'instructor' : adminExists ? 'admin' : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking email',
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
      password,
      approvalStatus: 'approved',
      isActive: true,
      approvedBy: req.user._id,
      approvedAt: new Date()
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

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
exports.updateAdminProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Update basic info
    if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;
    
    // Check if email is being changed and if it's already taken
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
      admin.email = email;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
      admin.password = newPassword;
    }

    await admin.save();

    // Return admin without password but with userType
    const updatedAdmin = await Admin.findById(admin._id).select('-password');
    const adminObject = updatedAdmin.toObject();
    adminObject.userType = 'admin';

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        admin: adminObject
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Upload admin profile photo
// @route   POST /api/admin/profile-photo
// @access  Private/Admin
exports.uploadProfilePhoto = async (req, res) => {
  try {
    console.log('Upload photo request received');
    console.log('Body:', req.body);
    
    if (!req.body.photo) {
      console.log('No photo in request body');
      return res.status(400).json({
        success: false,
        message: 'Please provide a photo'
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      console.log('Admin not found:', req.admin._id);
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // In a real application, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll store the base64 string directly
    admin.profilePhoto = req.body.photo;
    await admin.save();
    
    console.log('Photo saved successfully');

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully',
      data: {
        profilePhoto: admin.profilePhoto
      }
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading profile photo',
      error: error.message
    });
  }
};

// @desc    Get pending instructor applications
// @route   GET /api/admin/pending-instructors
// @access  Private/Admin
exports.getPendingInstructors = async (req, res) => {
  try {
    const pendingInstructors = await Instructor.find({ approvalStatus: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: pendingInstructors,
      count: pendingInstructors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending instructors',
      error: error.message
    });
  }
};

// @desc    Approve instructor application
// @route   PUT /api/admin/approve-instructor/:id
// @access  Private/Admin
exports.approveInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    instructor.approvalStatus = 'approved';
    instructor.isActive = true;
    instructor.approvedBy = req.user._id; // Admin who approved
    instructor.approvedAt = Date.now();
    await instructor.save();

    res.status(200).json({
      success: true,
      message: 'Instructor approved successfully',
      data: instructor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving instructor',
      error: error.message
    });
  }
};

// @desc    Decline instructor application
// @route   PUT /api/admin/decline-instructor/:id
// @access  Private/Admin
exports.declineInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    instructor.approvalStatus = 'declined';
    instructor.isActive = false;
    await instructor.save();

    res.status(200).json({
      success: true,
      message: 'Instructor application declined',
      data: instructor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error declining instructor',
      error: error.message
    });
  }
};
