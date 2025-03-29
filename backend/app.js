const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
const { db } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));

// Dynamically load all routes from the "routes" folder
readdirSync('./routes').map((route) => app.use('/api/v1', require(`./routes/${route}`)));

// Start the server
db(); // Connect to the database
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});