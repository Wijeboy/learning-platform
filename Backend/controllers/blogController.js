const Blog = require('../models/Blog');
const fs = require('fs');
const path = require('path');

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    const { title, category, overview, detailedDescription, authorName } = req.body;

    if (!title || !category || !overview || !detailedDescription || !authorName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!req.files || !req.files.blogImage || !req.files.authorImage) {
      return res.status(400).json({
        success: false,
        message: 'Please upload both blog image and author image'
      });
    }

    const blogData = {
      title,
      category,
      overview,
      detailedDescription,
      authorName,
      blogImage: `/uploads/images/${req.files.blogImage[0].filename}`,
      authorImage: `/uploads/images/${req.files.authorImage[0].filename}`,
      createdBy: req.admin._id,
      comments: []
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = {};

    if (category) {
      const categories = category.split(',');
      filter.category = { $in: categories };
    }

    const blogs = await Blog.find(filter)
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('createdBy', 'firstName lastName');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const updates = {
      title: req.body.title || blog.title,
      category: req.body.category || blog.category,
      overview: req.body.overview || blog.overview,
      detailedDescription: req.body.detailedDescription || blog.detailedDescription,
      authorName: req.body.authorName || blog.authorName
    };

    // Handle blog image update
    if (req.files && req.files.blogImage) {
      // Delete old image
      if (blog.blogImage) {
        const oldImagePath = path.join(__dirname, '..', blog.blogImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updates.blogImage = `/uploads/images/${req.files.blogImage[0].filename}`;
    }

    // Handle author image update
    if (req.files && req.files.authorImage) {
      // Delete old image
      if (blog.authorImage) {
        const oldImagePath = path.join(__dirname, '..', blog.authorImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updates.authorImage = `/uploads/images/${req.files.authorImage[0].filename}`;
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Delete blog image file
    if (blog.blogImage) {
      const imagePath = path.join(__dirname, '..', blog.blogImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete author image file
    if (blog.authorImage) {
      const imagePath = path.join(__dirname, '..', blog.authorImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Public
exports.addComment = async (req, res) => {
  try {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and comment'
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.comments.push({ name, comment });
    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};