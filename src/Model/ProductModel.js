const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: { type: Array, required: true },
    type: { type: Array, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number },
    isStatus: { type: Boolean, default: true },
    size: { type: Array, require: true },
    color: { type: Array, require: true },
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
