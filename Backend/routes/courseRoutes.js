const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  getInstructorCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  updateLesson,
  deleteLesson,
  togglePublish
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourse);

// Instructor routes (protected)
router.get('/instructor/my-courses', protect, getInstructorCourses);
router.post('/', protect, createCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);
router.patch('/:id/publish', protect, togglePublish);

// Lesson routes
router.post('/:id/lessons', protect, addLesson);
router.put('/:courseId/lessons/:lessonId', protect, updateLesson);
router.delete('/:courseId/lessons/:lessonId', protect, deleteLesson);

module.exports = router;
