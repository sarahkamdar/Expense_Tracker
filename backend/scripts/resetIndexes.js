const mongoose = require('mongoose');
require('dotenv').config();

const resetIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.collections();
        
        for (let collection of collections) {
            if (collection.collectionName === 'users') {
                console.log('Dropping all indexes from users collection...');
                await collection.dropIndexes();
                console.log('All indexes dropped successfully');
            }
        }

        console.log('Index reset completed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

resetIndexes(); 