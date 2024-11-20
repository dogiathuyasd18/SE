// server.js
const express = require('express');
const{sequelize,testConnection} = require('./main/utilities/Database.js');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
// Middleware setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// Test the database connection
testConnection();

// Server listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
