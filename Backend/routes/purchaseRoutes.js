const express = require('express');
const router = express.Router();
const {
  createPurchase,
  getMyPurchases,
  getAllPurchases
} = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');

// Student routes
router.post('/', protect, createPurchase);
router.get('/', protect, getMyPurchases);

// Admin routes
router.get('/all', adminProtect, getAllPurchases);

module.exports = router;