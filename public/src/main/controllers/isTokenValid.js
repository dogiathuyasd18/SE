const jwt=require('jsonwebtoken')
const User=require('../../../../models/User')

//Handle token validation
export const isTokenValid=async(req,res)=>{
    try{
        //Retrieve the token from the Authorization header
        const authHeader=req.header('Authorization');
        const userToken=authHeader ? authHeader.split('')[1]:null;

        if(!userToken){ return res.status(401).json(false)};

        const verifyToken=jwt.verify(userToken,process.env.JWT_SECRET_KEY);
        if(!verifyToken){ return res.status(401).json(false)};
        //Check if the user exists in the database
        const user=await User.findByPk(verifyToken.id);//Assuming verifyToken.id contains the user's ID

        if(!user) {return res.status(404).json(false)};
        //Return OK if the user exists
        return res.status(200).json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};