import mongoose from "mongoose";
const signUp = new mongoose.Schema({
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
    age: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
module.exports = mongoose.model("User", signUp);