import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exeed 100 characters "],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [1000000, "Product price cannot exeed 1000000 characters "],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: [true],
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    brand: {
      type: String,
      required: [true, "Please select category for this product"],
      enum: {
        values: [
          "Mercedes",
          "BMW",
          "Chevrolet",
          "Volvo",
          "Kia",
          "Jeep",
          "Honda",
          "Subaru",
          "Hundai",
          "Renault",
          "Peugeot",
        ],
        message: "Please select required category for product",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Product name cannot exeed 5 characters"],
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    iswedding: { type: Boolean },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
