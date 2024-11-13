import jwt from 'jsonwebtoken'
import User from "../../../../models/User.js";
const {errorMessage,validateChangePasswordForm} = require("../validations/User.js");
const {comparePassword} = require("../auth/auth.js");
//Handles user login
export const loginUser=async (req,res)=>{
    const userInfo=req.body;
    try{
        //If validationLoginForm is true
        if(validateLoginForm(userInfo)){
            //Check if user exists
            const user=await User.findOne({email:userInfo.email});
            //If user does not exists
            if(!user){
                return res.status(404).json({
                    message:"User not found",
                });
            }
            // Check if password is correct
            comparePassword(userInfo.password, user.password)
                .then((response) => {
                    // If password is correct
                    if (response) {
                        // Login the user
                        const token = jwt.sign(
                            { id: user._id },
                            process.env.ACCESS_TOKEN_SECRET
                        );
                        res.status(200).json({
                            token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                date: user.date,
                            },
                        });
                    } else {
                        res.status(401).json({
                            message: "Invalid credentials.",
                        });
                    }
                })
                .catch((error) => {
                    res.status(500).json({
                        message: error.message,
                    });
                });
        }
        //Response failed -> show message
        else {
            res.status(400).json({ message: errorMessage() });
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};