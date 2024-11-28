const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const User=require('../../models/User')
//Hash user password and save user to database
const hashedPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    return hashedPassword;
}

//Check if password matches the hashed password
const comparePassword=async (password,userPassword)=>{
    const isMatch=await bcrypt.compare(password,userPassword);
    return isMatch;
}

//Protect private routes from unauthorized access
const authorizedRoutes = async (req, res, next) => {
    // Check if user is authenticated
    try {
        //Get the token from the authorized header
        const authorizationHeader=req.header('Authorization');
        const userToken=authorizationHeader ? authorizationHeader.replace('Bearer ',''):null;

        // Check if the token exists
        if (!userToken) {
            return res.status(401).json({
                message: "You are not authorized to access this page.",
            });
        }
        //Verify token
        const verifyToken=jwt.verify(userToken,process.env.ACCESS_TOKEN_SECRET);

        //Find the user by ID(from the token payload)
        const user=await User.findByPk(verifyToken.id);

        if(!user){
            return res.status(403).json({
                message:"There is no current user that this token is attached to."
            });
        }
        req.user=user.userId;
        next();
    }catch (error) {
        //Token verification error on other errors
        if(error.name==="JsonWebTokenError"){
            return res.status(403).json({message:"Invalid token"});
        }
        if(error.name==="TokenExpiredError"){
            return res.status(403).json({message:"Token expired"});
        }
        return res.status(500).json({message:error.message});
    }
};
module.exports = {hashedPassword,comparePassword,authorizedRoutes};