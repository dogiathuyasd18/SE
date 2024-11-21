// server.js
const express = require('express');
const{sequelize,testConnection} = require('./main/utilities/Database.js');
const paymentRoutes=require('./main/routes/payment.js');
const userRoutes=require('./main/routes/users.js');
const searchRoutes=require('./main/routes/search.js');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
// Middleware setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// Test the database connection
testConnection()
.then(()=> console.log('Database connection established'))
.catch(err=> console.error('Database connection failed',err));

// Routes
app.use('/api/search',searchRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/user',userRoutes);
// Server listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
