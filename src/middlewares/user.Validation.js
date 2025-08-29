import { check } from "express-validator";

const userValidator = [
    check('username')
        .trim(),
    
    check('email')
        .isEmail()
        .trim(),
    
    check('password')
        .trim()
        .isStrongPassword().withMessage('User a strong password')
]
   
export default userValidator