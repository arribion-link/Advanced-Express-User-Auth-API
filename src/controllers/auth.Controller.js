import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// imports
import user from '../models/authSchema.js'

// middleware
// import userValitor from '../  ' 

export const register  = async (req, res) => {
    // receive data from the user and destrure
    const {username, password, email } = req.body;
    
    if(!username){
        res.status(400).send('Username is required');
    }
    if(!password){
        res.status(400).send('password is required');
    }
    if(!email){
        res.status(400).send('Email is required');
    }

    async function checkIfUserExist() {
        try {
            const userExist = await user.findOne({ email });
            if (userExist) {
                res.send('user already exist please!')
                process.exit(1);
            }
        } catch (err) {
            console.log("error checking user from databse")
        }
    }
    checkIfUserExist()

    // hashing password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log('error generating bcrypt salt');
            process.exit(1);
        } else {
            return salt
        }
    })
    async function hashingPassword() {
        try {
            const hashedPassword = await bcrypt.hash(password, salt, (err) => {
                if (err) {
                    console.log('bcrypt.hash failed...');
                }
            });
            return hashedPassword
        } catch (err) {
            console.log('error hashing user password...', err);
        }
    }
    // calling password hashing function
    hashingPassword();
    
    res.send('Login route');
}

export const login = async (req, res) => {
    res.send('Register route');
}

export default {
    login, 
    register 
};