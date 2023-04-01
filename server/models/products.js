const mongoose = require("mongoose");


const productScema = new mongoose.Schema({
    name: { type: String, reuired: true},
    brand: { type: String, reuired: true},
    desc: { type: String, reuired: true},
    price: { type: Number, reuired: true},
    image: { type: Object, reuired: true},
},
    { timestamps: true }
);

const Product = mongoose.model("Product", productScema);

exports.Product = Product;