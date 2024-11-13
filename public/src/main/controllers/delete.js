const User=require('../models/User')
export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        //Check if a user with the id exists
        const user=await User.findById({_id:id});
        //If the user exists, delete the user
        if(user){
            //Check if its the account logged in 
            if(user._id.toString()===req.user._id.toString()){
                //ID== current logged in 
                //Delete the user
                const deletedUser= await User.findByIdAndDelete({_id:id});
                res.status(200).json({message:'User deleted successfully',
                user:{name:deletedUser.name},
                });
            }else{
                //ID=other users ID
                res.status(400).json({
                    message:"Cannot delete another user's account"
                });
            }
        }else{
            //User does not exist or wrong ID
            res.status(404).json({
                message:"User not found",
                id:req.params.id,
            });
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};