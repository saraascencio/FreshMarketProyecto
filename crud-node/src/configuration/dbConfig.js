const mongoose = require('mongoose');

const connectedtoMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/FreshMarket');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
    }
};

module.exports = { mongoose, connectedtoMongoDB };




