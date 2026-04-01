

const express = require('express');
const router = express.Router();
// Import controller functions from shopController.js
//const { getAllShops, createShop, getShopById } = require('../controllers/shopController');
const { getAllShops, createShop, getShopById, deleteShop } = require('../controllers/shopController');


/**
 * @route   GET /api/shops
 * @desc    Get all courses/products from the database
 * @access  Public
 */
router.get('/', getAllShops);

/**
 * @route   GET /api/shops/:id
 * @desc    Get a single course/product by its MongoDB ID
 * @access  Public
 */
router.get('/:id', getShopById);

/**
 * @route   POST /api/shops
 * @desc    Create/Add a new course to the database
 * @access  Public (Should be protected for Admin later)
 */
router.post('/', createShop);

router.delete('/:id', deleteShop);

module.exports = router;