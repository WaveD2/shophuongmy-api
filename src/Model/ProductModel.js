const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: { type: Array, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number },
    isStatus: { type: Array, require: true },
    size: { type: Array, require: true },
    colors: { type: Array, require: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
