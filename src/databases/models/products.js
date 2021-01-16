import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    name: {type: String,
        require: true},

    price: {type: Number,
        require: true},

    category: {type: String,
        require: true},
}, {timestamp: true});

export default mongoose.model("Products", ProductSchema);