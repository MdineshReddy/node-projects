const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price is Required"],
  },
  company: {
    type: String,
    // enum: ["ikea", "liddy", "caressa", "marcos"],
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "${VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
