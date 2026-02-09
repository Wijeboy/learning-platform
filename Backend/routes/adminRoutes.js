const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createAdmin,
  createInstructor,
  updateUser,
  deleteUser,
  toggleUserStatus,
  updateAdminProfile,
  uploadProfilePhoto,
  checkEmailExists,
  getPendingInstructors,
  approveInstructor,
  declineInstructor
} = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

// All routes require admin authentication
router.use(adminProtect);

// Admin profile routes
router.put('/profile', updateAdminProfile);
router.post('/profile-photo', uploadProfilePhoto);

// Check email existence
router.get('/check-email/:email', checkEmailExists);

// Instructor approval routes
router.get('/pending-instructors', getPendingInstructors);
router.put('/approve-instructor/:id', approveInstructor);
router.put('/decline-instructor/:id', declineInstructor);

// Get all users
router.get('/users', getAllUsers);

// Create new admin or instructor
router.post('/create-admin', createAdmin);
router.post('/create-instructor', createInstructor);

// Update, delete, toggle status
router.put('/users/:userType/:id', updateUser);
router.delete('/users/:userType/:id', deleteUser);
router.patch('/users/:userType/:id/toggle-status', toggleUserStatus);

module.exports = router;
