const express = require('express');
const router = express.Router();
//Import the user controller
const { loginUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const { isTokenValid } = require('../controllers/isTokenValid.js');
const { userProfile } = require('../controllers/profile.js');
const { changePassword } = require('../controllers/change-password.js');
const { deleteUser } = require('../controllers/delete.js');
const { authorizedRoutes } = require('../auth/auth.js');
//User login route
router.post("/login",loginUser);
//User register route
router.post("/register",registerUser);
//User token validation route
router.get("/isTokenValid",authorizedRoutes,isTokenValid);
//User profile end point
router.get("/profile",authorizedRoutes,userProfile);
//User change password end point
router.post("/change-password",authorizedRoutes,changePassword);
//User delete account end point
router.delete("/delete",authorizedRoutes,deleteUser);

module.exports=router;

