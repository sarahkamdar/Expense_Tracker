const mongoose = require('mongoose');
require('dotenv').config();

const dropIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.collections();
        
        for (let collection of collections) {
            const indexes = await collection.indexes();
            console.log(`Collection: ${collection.collectionName}`);
            console.log('Indexes:', indexes);
            
            // Drop the username index if it exists
            if (indexes.some(index => index.key && index.key.username)) {
                await collection.dropIndex('username_1');
                console.log('Dropped username index');
            }
        }

        console.log('Index cleanup completed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dropIndex(); 