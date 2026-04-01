const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    price: String,
    category: String,
});

module.exports = mongoose.model('Shop', shopSchema);