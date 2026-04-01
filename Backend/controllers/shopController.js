

const Shop = require('../models/Shop');

/**
 * @desc    Get all shops/courses from MongoDB
 * @route   GET /api/shops
 */
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @desc    Get a single shop/course by ID
 * @route   GET /api/shops/:id
 */
exports.getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) return res.status(404).json({ message: "Course not found" });
        res.json(shop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @desc    Create a new shop/course entry
 * @route   POST /api/shops
 */
exports.createShop = async (req, res) => {
    // Create a new instance of the Shop model with data from request body
    const shop = new Shop({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        instructor: req.body.instructor,
        language: req.body.language,
        rating: req.body.rating
    });

    try {
        const newShop = await shop.save(); // Save to MongoDB
        res.status(201).json(newShop); // Return the saved data
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
/**
 * @desc    Delete a shop/course by ID
 * @route   DELETE /api/shops/:id
 */
exports.deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.id);

        if (!shop) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};