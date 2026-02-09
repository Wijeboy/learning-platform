const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getMyEnrollments,
  getEnrollment,
  getEnrollmentByCourse,
  updateProgress,
  getInstructorEnrollments
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Student routes
router.post('/', enrollInCourse);
router.get('/my-courses', getMyEnrollments);
router.get('/course/:courseId', getEnrollmentByCourse);
router.get('/:id', getEnrollment);
router.put('/:id/progress/:lessonId', updateProgress);

// Instructor routes
router.get('/instructor/students', getInstructorEnrollments);

module.exports = router;
