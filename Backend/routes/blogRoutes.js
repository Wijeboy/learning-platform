const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  addComment
} = require('../controllers/blogController');
const { adminProtect } = require('../middleware/adminMiddleware');
const multer = require('multer');
const path = require('path');

// Set up storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: imageFilter
});

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.post('/:id/comments', addComment);

// Admin routes
router.post(
  '/',
  adminProtect,
  upload.fields([
    { name: 'blogImage', maxCount: 1 },
    { name: 'authorImage', maxCount: 1 }
  ]),
  createBlog
);

router.put(
  '/:id',
  adminProtect,
  upload.fields([
    { name: 'blogImage', maxCount: 1 },
    { name: 'authorImage', maxCount: 1 }
  ]),
  updateBlog
);

router.delete('/:id', adminProtect, deleteBlog);

module.exports = router;