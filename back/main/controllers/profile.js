const User=require( "../../models/User.js");
//Handles user profile update
export const userProfile=async (req,res)=>{
    try{
        const userId= req.user;
        //Retrieve user by primary key Sequelize
        const user= await User.findByPk(userId);
        //If the user does not exists,return a 404 status
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //Return the user profile details    
        res.status(200).json({
            user:{
            id:user.userId,
            name:user.name,
            email:user.email,
            date:user.dateOfBirth,
            },
        });
    }catch(error){
        //Handle errors and respond with 500
        res.status(500).json({error:error.message}); 
    }
};
module.exports = {userProfile};