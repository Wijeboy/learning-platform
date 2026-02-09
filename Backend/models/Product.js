const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide product title'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  language: {
    type: String,
    required: [true, 'Please select a language'],
    enum: ['English', 'German', 'French', 'Spanish', 'Sinhala']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  image: {
    type: String,
    required: [true, 'Please upload product image']
  },
  pdfResource: {
    type: String,
    required: false
  },
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;