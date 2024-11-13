import User from "../../../../models/User.js";
//Handles user profile update
export const userProfile=async (req,res)=>{
    const userID= req.user;
    const user= await User.findById({_id:userID});
    res.status(200).json({
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            date:user.date
        }
    });
};