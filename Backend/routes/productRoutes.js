const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { adminProtect } = require('../middleware/adminMiddleware');
const { uploadProduct } = require('../middleware/upload');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Admin routes
router.post(
  '/',
  adminProtect,
  uploadProduct.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfResource', maxCount: 1 }
  ]),
  createProduct
);

router.put(
  '/:id',
  adminProtect,
  uploadProduct.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfResource', maxCount: 1 }
  ]),
  updateProduct
);

router.delete('/:id', adminProtect, deleteProduct);

module.exports = router;