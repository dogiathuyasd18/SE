'use strict'
const Customer = require("../models/User")
const bcrypt=require('bcrypt')
const asyncHandler=require('express-async-handler'); 
class accessService {
    static signUp = async ({name,email,password}) => {
        try{
            //check if user exists
            const holderlUsers= await Customer.findOne({where:{email}}).lean();
            if(holderlUsers){
                return{
                    code:'20002',
                    message:'User already exists',
                    status:'error',
                }
            }
            
            const passwordHash=await bcrypt.hash(password,10);
            const newUser = await Customer.create({name,email,password:passwordHash,tier});
        }catch(err){
            return{
            code:'...',
            message: err.message,
            status: 'error'
            }   
        }
    }
}
module.exports = accessService;