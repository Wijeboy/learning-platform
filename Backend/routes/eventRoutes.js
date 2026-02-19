const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { adminProtect } = require('../middleware/adminMiddleware');
const { uploadImage } = require('../middleware/upload');

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Admin routes
router.post('/', adminProtect, uploadImage.single('image'), createEvent);
router.put('/:id', adminProtect, uploadImage.single('image'), updateEvent);
router.delete('/:id', adminProtect, deleteEvent);

module.exports = router;