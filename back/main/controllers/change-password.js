const User = require("../../models/User.js")
const {validateChangePasswordForm} = require("../validations/User.js");
const {hashedPassword,comparePassword} = require("../auth/auth.js");
//Handles user password
const changePassword = async (req, res) => {
    const userInfo = req.body;
    // Validate the input
    const validation = validateChangePasswordForm(userInfo);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }
    try{
        // Fetch the user by userId
        const user = await User.findByPk(req.user.userId);

        if(!user) {
            return res.status(404).json({message: "User not found.",});
        }
        // Check if the new password matches the old password
        if(await comparePassword(userInfo.password,user.password)){
            return res.status(400).json({message: "Choose a new password.",});
        }
        // Update the user's password after hashing
        await User.update(
            { password: await hashedPassword(userInfo.password) },
            { where: { userId: req.user.userId } }
        );
        res.status(200).json({message: "Password has been successfully updated.",});
    }catch(error) {
        res.status(500).json({message: error.message,});
    }
};
module.exports={changePassword};