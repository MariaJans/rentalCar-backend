import mongoose from "mongoose";

const Database = async () => {
    try {
        await mongoose.connect("mongodb+srv://MariaJans:Maria12345@zrentcar.rqq1p.mongodb.net/ZRentCar-DB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected")
    } catch (err) {
        console.log("Error connecting")
    }
}

module.exports = Database;