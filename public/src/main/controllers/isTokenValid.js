const jwt=require('jsonwebtoken')
const User=require('../models/User')

//Handle token validation
export const isTokenValid=async(req,res)=>{
    try{
        const userToken=req.header('Authorization').replace('Bearer')[1];
        if(!userToken) return res.status(401).json(false);
        const verifyToken=jwt.verify(userToken,process.env.JWT_SECRET_KEY);
        if(!verifyToken) return res.status(401).json(false);
        const user=await User.findById({_id:verifyToken.id});
        if(!user) return res.status(404).json(false);
        return res.status(200).json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};