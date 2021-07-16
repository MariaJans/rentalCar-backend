import mongoose from "mongoose";
const signUp = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    driverlisence: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", signUp);
