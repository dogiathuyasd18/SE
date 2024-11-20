const {errorMessage,validateRegisterForm}=require( "../validations/User.js");
const { hashedPassword }=require("../auth/auth.js");
const {getConnection}=require("../utilities/Database.js");
export const registerUser=async (req,res) =>{
  const user= req.body;
  try{
    //Validate the registration form
    const response= await validateRegisterForm(user);

    if(response){
      //The form is valid,hash the password
      const hash= await hashedPassword(user.password);
      const{ name,email}=user;
      //Establish database connection
      const connection= await getConnection();
      const [existingUser]= await connection.execute('SELECT * FROM User WHERE email=?',[email]);
      //Check if user already registered
      if(existingUser.length>0){
        res.status(400).json({message:"Email already registered"});
      } 


      const result= await connection.execute('INSERT INTO User(name,email,password) VALUES(:name,:email,password)',
        {name,email,password:hash},
        {autoCommit:true}
      );
      const savedUser={
        id:result.insertId,
        name,
        email,
      };
      res.status(201).json(savedUser);
    }else{
      res.status(400).json({message:errorMessage(),});
    }
  }catch(error){
    res.status(500).json({message:error.message});
  }
};
module.exports={registerUser};