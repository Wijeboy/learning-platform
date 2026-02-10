const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide blog title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design']
  },
  overview: {
    type: String,
    required: [true, 'Please provide overview']
  },
  detailedDescription: {
    type: String,
    required: [true, 'Please provide detailed description']
  },
  authorName: {
    type: String,
    required: [true, 'Please provide author name'],
    trim: true
  },
  blogImage: {
    type: String,
    required: [true, 'Please upload blog image']
  },
  authorImage: {
    type: String,
    required: [true, 'Please upload author image']
  },
  comments: [commentSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;