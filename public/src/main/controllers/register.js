import {errorMessage,validateRegisterForm} from "../validations/User.js";
import { hashedPassword } from "../auth/auth.js";
export const registerUser=async (req,res) =>{
  const user= req.body;
  try{
    //Validate the registration form
    const response= await validateRegisterForm(user);
    if(response){
      //The form is valid,hash the password
      const hash= await hashedPassword(user.password);
      const{ name,email}=user;
      const connection= await getConnection();
      const existingUser= await connection.query('SELECT * FROM users WHERE email=?',[email]);
      if(existingUser.length>0){
        res.status(400).json({message:"Email already registered"});
      const result= await connection.execute('INSERT INTO users(name,email,password) VALUES(?,?,?)',[name,email,hash],
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
  }
  }catch(error){
    res.status(500).json({message:error.message});
    }
};