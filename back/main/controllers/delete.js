const User=require('../../models/User')
const deleteUser=async(req,res)=>{
    const {id}=req.params;
    try{
        //Check if a user with the given ID exists
        const user=await User.findOne({where:{userId:id}});
        //If the user exists, delete the user
        if(!user){
            //User does not exist
            return res.status(404).json({message:"User not found",id,});
        }
        //Check if the userId matches the logged-in user's ID
        if(user.userId != req.user.userId){
            return res.status(403).json({message:"You are not authorized to delete this user.",});
        }
        //Delete the user
        await user.destroy();
        return res.status(200).json({message:"User has been deleted.",user:{name:user.name},});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
module.exports=deleteUser;