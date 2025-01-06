require("dotenv").config();
const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/mern_admin"
const URI = process.env.MONGODB_URI //by using .env


const connectDB = async () => {
    try {
        await mongoose.connect(URI); 
        // We have to wait for connection establishment

        console.log("Successfully connected to the Database");

    } catch (error) {
        console.error("Database connection failed");
        process.exit(0);
    }
};

module.exports = connectDB;