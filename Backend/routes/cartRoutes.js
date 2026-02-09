const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/:productId', addToCart);
router.delete('/:productId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;