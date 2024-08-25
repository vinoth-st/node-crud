const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: { required: true, type: String, minlength: 3, maxlength: 50 }, 
    price: { required: true, type: Number, min: 0 }, 
    description: { type: Number, maxlength: 500, default: null}, 
    image: { type: String, default: null},
    imageUrl: { type: [String], default: [] }
});

module.exports = mongoose.model('products', blogSchema);