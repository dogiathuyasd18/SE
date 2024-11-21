const {validateRegisterForm}=require( "../validations/User.js");
const { hashedPassword }=require("../auth/auth.js");
const {User} = require("../../models/User.js");
const registerUser=async (req,res) =>{
  const user= req.body;
  try{
    //Validate the registration form
    const validateResponse= await validateRegisterForm(user);
    if(!validateResponse.isValid){
      return res.status(400).json({message:validateResponse.errorMessage});
    }
      //Hash the password
      const hash= await hashedPassword(user.password);
      const{ name,email,gender,phoneNumber,dateOfBirth,address,tier}=user;
      //Check if user exists
      const existingUser= await User.findOne({where:{email}});
      //Check if user already registered
      if(existingUser){
        res.status(400).json({message:"Email already registered"});
      } 
      //Create a new user 
      const newUser= await User.create({
        name,
        email,
        password:hash,
        gender,
        phoneNumber,
        dateOfBirth,
        address,
        tier,
      });
      //Return the created user 
      const savedUser= {
        id:newUser.userId,
        name:newUser.name,
        email:newUser.email,
        gender:newUser.gender,
        phoneNumber:newUser.phoneNumber,
        dateOfBirth:newUser.dateOfBirth,
        address:newUser.address,
        tier:newUser.tier,
      };
      res.status(201).json(savedUser);
  }catch(error){
    console.log("Error during registration:",error);
    res.status(500).json({message:error.message});
  }
};
module.exports={registerUser};