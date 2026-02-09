const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get student's cart
// @route   GET /api/cart
// @access  Private/Student
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ student: req.user._id })
      .populate({
        path: 'products.product',
        select: 'title price image category language'
      });

    if (!cart) {
      cart = await Cart.create({ student: req.user._id, products: [] });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// @desc    Add product to cart
// @route   POST /api/cart/:productId
// @access  Private/Student
exports.addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let cart = await Cart.findOne({ student: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        student: req.user._id,
        products: [{ product: req.params.productId }]
      });
    } else {
      // Check if product already in cart
      const productExists = cart.products.some(
        item => item.product.toString() === req.params.productId
      );

      if (productExists) {
        return res.status(400).json({
          success: false,
          message: 'Product already in cart'
        });
      }

      cart.products.push({ product: req.params.productId });
      await cart.save();
    }

    cart = await Cart.findOne({ student: req.user._id })
      .populate({
        path: 'products.product',
        select: 'title price image category language'
      });

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:productId
// @access  Private/Student
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ student: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ student: req.user._id })
      .populate({
        path: 'products.product',
        select: 'title price image category language'
      });

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private/Student
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ student: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};