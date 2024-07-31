const mongoose = require('mongoose');

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoDB connected to ${process.env.MONGO_URL}`.bgGreen);
    } catch (error) {
        console.log(`mongoDB connection error: ${error.message}`.bgRed);
    }
}

module.exports = database;