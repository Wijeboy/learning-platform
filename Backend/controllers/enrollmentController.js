const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private/Student
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'This course is not available for enrollment'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create progress array for all lessons
    const progress = course.lessons.map(lesson => ({
      lessonId: lesson._id,
      completed: false,
      watchTime: 0
    }));

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
      progress,
      paymentAmount: course.price,
      paymentStatus: 'completed' // In real app, this would be 'pending' until payment gateway confirms
    });

    // Update course enrollment count
    course.enrollmentCount += 1;
    await course.save();

    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('course', 'title thumbnail instructor');

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: populatedEnrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message
    });
  }
};

// @desc    Get student's enrollments
// @route   GET /api/enrollments/my-courses
// @access  Private/Student
exports.getMyEnrollments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { student: req.user._id };
    
    if (status) query.status = status;

    const enrollments = await Enrollment.find(query)
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'firstName lastName'
        }
      })
      .sort({ lastAccessedAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

// @desc    Get single enrollment with full course details
// @route   GET /api/enrollments/:id
// @access  Private/Student
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'firstName lastName email'
        }
      });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check ownership
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this enrollment'
      });
    }

    // Update last accessed
    enrollment.lastAccessedAt = Date.now();
    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message
    });
  }
};

// @desc    Get enrollment by course ID
// @route   GET /api/enrollments/course/:courseId
// @access  Private/Student
exports.getEnrollmentByCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId
    }).populate({
      path: 'course',
      populate: {
        path: 'instructor',
        select: 'firstName lastName email'
      }
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'You are not enrolled in this course'
      });
    }

    // Update last accessed
    enrollment.lastAccessedAt = Date.now();
    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message
    });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/enrollments/:id/progress/:lessonId
// @access  Private/Student
exports.updateProgress = async (req, res) => {
  try {
    const { completed, watchTime } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check ownership
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this enrollment'
      });
    }

    const progressItem = enrollment.progress.find(
      p => p.lessonId.toString() === req.params.lessonId
    );

    if (!progressItem) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found in enrollment'
      });
    }

    if (completed !== undefined) {
      progressItem.completed = completed;
      if (completed) {
        progressItem.completedAt = Date.now();
      }
    }

    if (watchTime !== undefined) {
      progressItem.watchTime = watchTime;
    }

    enrollment.lastAccessedAt = Date.now();
    await enrollment.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
};

// @desc    Get instructor's student enrollments
// @route   GET /api/enrollments/instructor/students
// @access  Private/Instructor
exports.getInstructorEnrollments = async (req, res) => {
  try {
    const { courseId } = req.query;
    
    // Get instructor's courses
    const Course = require('../models/Course');
    let query = { instructor: req.user._id };
    if (courseId) query._id = courseId;
    
    const courses = await Course.find(query).select('_id');
    const courseIds = courses.map(c => c._id);

    const enrollments = await Enrollment.find({ course: { $in: courseIds } })
      .populate('student', 'firstName lastName email')
      .populate('course', 'title')
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};
