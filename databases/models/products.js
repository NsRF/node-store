const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {type: String,
        require: true},

    price: {type: Number,
        require: true},

    category: {type: String,
        require: true},
}, {timestamp: true});

module.exports = mongoose.model("Products", ProductSchema);