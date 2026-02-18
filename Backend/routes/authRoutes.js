const express = require('express');
const router = express.Router();
const { register, login, getMe, checkEmail, updateProfile, updateProfilePhoto } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/check-email', checkEmail);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.post('/update-photo', protect, updateProfilePhoto);

module.exports = router;
