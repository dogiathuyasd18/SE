const User = require('../../models/User');


function isEmailValid(email){
    //Email criteria
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Password validation
function passwordValidation(password){
    const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    //Test criteria
    return passwordCriteria.test(password);
}

//Login validation
const validateLoginForm=({email,password}) =>{
    if(!email||!password){
    //check missing fields
    return {isValid:false,message:'Please fill in all fields'};
    }
    return{isValid:true};
}
//Profile update validation
const validateProfileUpdate=(formInfo) =>{
    const {name,email}=formInfo;
    if(!name || !email){
        message='Please fill in all fields';
        return false;
    }
    if(!isEmailValid(email)){
        message='Invalid email';
        return false;
    }
    return true;
};
//Register form validation
const validateRegisterForm=async ({name,email,password,confirmPassword}) =>{
    //check missing fields
    if(!name || !email || !password || !confirmPassword){
        message='Please fill in all fields';
        return false;
    }
    //Check email format
    if(!isEmailValid(email)){
        return {isValid:false,message:'Invalid email'};
    }

    //check if email is already registered
    const existingUser = await User.findOne({where:{email}});
    if(existingUser){
        return {isValid:false,message:'Email already registered'};
    }

    if(!passwordValidation(password)){
        return {isValid:false,message:'Invalid Password! Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and at least 6 characters'};
    }
    if(password!==confirmPassword){
        return {isValid:false,message:'Passwords do not match'};
    }
    return {isValid:true};
};

//Change password form validation
const validateChangePasswordForm = ({ password, confirmPassword }) => {
    if (!password || !confirmPassword) {
        return { isValid: false, message: 'Please fill in all fields' };
    }

    if (!passwordValidation(password)) {
        return {
            isValid: false,
            message:
                'Invalid Password! Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and at least 6 characters',
        };
    }
    if (password !== confirmPassword) {
        return { isValid: false, message: 'Passwords do not match' };
    }

    return { isValid: true };
};

//Forgot password form validation
const validateForgotPassword=({email})=>{
    if(!email){
        return {isValid:false,message:'Email required'};
    }
    if(!isEmailValid(email)){
        return {isValid:false,message:'Invalid email'};
    }
    return {isValid:true};
}
module.exports={
    validateLoginForm,
    validateRegisterForm,
    validateChangePasswordForm,
    validateProfileUpdate,
    validateForgotPassword,
};