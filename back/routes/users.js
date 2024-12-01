const express = require('express');
const { loginUser, registerUser, getUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Import user controller
const { isTokenValid } = require('../controllers/isTokenValid.js');
const { userProfile } = require('../controllers/profile.js');
const { changePassword } = require('../controllers/change-password.js');
const { deleteUser } = require('../controllers/delete.js');
const { authorizedRoutes } = require('../auth/auth.js');


// User login route
router.post("/login", loginUser);
// User register route
router.post('/register', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
// User token validation route
router.get("/isTokenValid", authorizedRoutes, isTokenValid);
// User profile endpoint
router.get('/profile', protect, getUserProfile);
// User change password endpoint
router.post("/change-password", authorizedRoutes, changePassword);
// User delete account endpoint
router.delete("/delete", authorizedRoutes, deleteUser);
// GET /api/users/profile


module.exports = router;
