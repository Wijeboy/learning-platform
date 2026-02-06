const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createAdmin,
  createInstructor,
  updateUser,
  deleteUser,
  toggleUserStatus
} = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

// All routes require admin authentication
router.use(adminProtect);

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
