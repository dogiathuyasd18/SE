import express from 'express';
const router=express.Router();
//Import the user controller
import {loginUser} from '../controllers/login.js';
import {registerUser} from '../controllers/register.js';
import {isTokenValid} from '../controllers/isTokenValid.js';
import {userProfile} from '../controllers/profile.js';
import {changePassword} from '../controllers/change-password.js';
import {deleteUser} from '../controllers/delete.js';
import { authorizedRoutes } from '../auth/auth.js';
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

export default router;

