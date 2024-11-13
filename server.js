// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './public/src/main/utilities/Database.js';

dotenv.config();

const app = express();

// Test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

// Middleware setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Define routes
app.post('/login', async (req, res) => {
    res.send('Login route');
});

app.post('/register', async (req, res) => {
    res.send('Register route');
});

// Server listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
