const jwt= require('jsonwebtoken');
const User=require ("../../models/User.js");
const {validateLoginForm} = require("../validations/User.js");
const {comparePassword} = require("../auth/auth.js");
//Handles user login
const loginUser=async (req,res)=>{
    const userInfo=req.body;
    try{
        const validation=validateLoginForm(userInfo);
        //If validationLoginForm is true
        if(!validation.isValid){
            return res.status(400).json({message:validation.message});
        }
        // Check if user exists
        const user=await User.findOne({email:userInfo.email});
            if(!user){
                return res.status(400).json({message:'User not found.'});
            }
            // Check if password is correct
            const isPasswordCorrect=await comparePassword(userInfo.password,user.password);
            if(!isPasswordCorrect){
                return res.status(400).json({message:'Invalid password.'});
            }
            // Create token
            const token=jwt.sign(
                {id:userId},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1h'} //expires in 1 hour(optional)
            );
            res.status(200).json({
                token,
                user:{
                    id:user.userId,
                    name:user.name,
                    email:user.email,
                    dateOfBirth:user.dateOfBirth,
                    gender:user.gender,
                    role:user.role,
                    phoneNumber:user.phoneNumber,
                    address:user.address,
                    tier:user.tier,
                },
            });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports={loginUser};