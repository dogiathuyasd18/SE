import User from "../../../../models/User.js"
let message = '';
export const errorMessage= () => message;
//Password validation
function passwordValidation(password){
    const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    //Test criteria
    let isValid=passwordCriteria.test(password);
    return isValid?true:false;
}
//Login validation
export const validateLoginForm=(formInfo) =>{
    const {email,password}=formInfo;
    //check missing fields
    if(!email || !password){
        message='Please fill in all fields';
        return false;
    }
    return true;
}
//Register form validation
export const validateRegisterForm=(formInfo) =>{
    const {name,email,password,confirmPassword}=formInfo;
    //check missing fields
    if(!name || !email || !password || !confirmPassword){
        message='Please fill in all fields';
        return false;
    }
    //check if email is already registered
    const isEmailRegistered = async () => await User.findOne({email:email});
    if(isEmailRegistered){
        message='Email already registered';
        return false;
    }
    const isPasswordValid=passwordValidation(password);
    if(isPasswordValid){
        if(password!==confirmPassword){
            message='Passwords do not match';
            return false;
        }
    }else{
        message="Invalid Password! Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and at least 6 characters";
        return false;
    }
    return true;
};

//Change password form validation
export const validateChangePasswordForm=(formInfo) =>{
    const {password,confirmPassword}=formInfo;
    //check missing fields
    if(!password || !confirmPassword){
        message='Please fill in all fields';
        return false;
    }
    //Check password meets criteria
    const isPasswordValid=passwordValidation(password);
    if(isPasswordValid){
        if(password!==confirmPassword){
            message='Passwords do not match';
            return false;
        }
    }else{
        message="Invalid Password! Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and at least 6 characters";
        return false;
    }
    return true;
};
