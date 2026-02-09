const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create purchase from cart
// @route   POST /api/purchases
// @access  Private/Student
exports.createPurchase = async (req, res) => {
  try {
    const { cardNumber, nameOnCard, expiryDate, cvv } = req.body;

    if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all payment details'
      });
    }

    const cart = await Cart.findOne({ student: req.user._id })
      .populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total amount
    const totalAmount = cart.products.reduce((total, item) => {
      return total + item.product.price;
    }, 0);

    // Create purchase
    const purchase = await Purchase.create({
      student: req.user._id,
      products: cart.products.map(item => ({ product: item.product._id })),
      totalAmount,
      paymentDetails: {
        cardNumber: `****${cardNumber.slice(-4)}`, // Store only last 4 digits
        nameOnCard
      }
    });

    // Clear cart after purchase
    cart.products = [];
    await cart.save();

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate({
        path: 'products.product',
        select: 'title price image pdfResource'
      });

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      data: populatedPurchase
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing purchase',
      error: error.message
    });
  }
};

// @desc    Get student's purchases (My Resources)
// @route   GET /api/purchases
// @access  Private/Student
exports.getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ student: req.user._id })
      .populate({
        path: 'products.product',
        select: 'title price image pdfResource'
      })
      .sort({ purchaseDate: -1 });

    // Flatten all products from all purchases
    const allProducts = purchases.reduce((acc, purchase) => {
      const products = purchase.products.map(item => ({
        ...item.product.toObject(),
        purchasedAt: item.purchasedAt
      }));
      return [...acc, ...products];
    }, []);

    res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchases',
      error: error.message
    });
  }
};

// @desc    Get all purchases (Admin)
// @route   GET /api/purchases/all
// @access  Private/Admin
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('student', 'firstName lastName email')
      .populate({
        path: 'products.product',
        select: 'title price image'
      })
      .sort({ purchaseDate: -1 });

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchases',
      error: error.message
    });
  }
};