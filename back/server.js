// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./utilities/Database');
const userRoutes = require('./routes/users'); // Adjust the path as necessary

dotenv.config(); // Load environment variables at the very beginning

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test the database connection
(async () => {
  try {
    // await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync models if needed (be cautious with force: true as it will drop tables)
    // await sequelize.sync({ force: false });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Define routes
app.use('/api/users', userRoutes); // Use user routes under /api/users

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: 'Internal Server Error' });
});

app.get("/helloworld", (req, res) => {
    console.log("có đứa mới request")
    res.json("hello");
})

// Server listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
