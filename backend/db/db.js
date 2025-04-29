const mongoose = require('mongoose');

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        // Instead of exiting, we'll throw the error to be handled by the caller
        throw error;
    }
};

module.exports = { db };