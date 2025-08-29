import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// middleware

export const register  = async (req, userValidator, res) => {
    // receive data from the user and destrure
    const {username, password, email } = req.body;
    try {
        
        if(!username){
            res.status(400).send('Username is required');
        }
        if(!password){
            res.status(400).send('password is required');
        }
        if(!email){
            res.status(400).send('Email is required');
        }
    
        // check if user exist
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
        hashingPassword();
    
        // saving the new user to the database
        async function saveUser() {
            try {
                const newUser = await new User({
                    username,
                    email,
                    password: hashingPassword
                });
                await newUser.save();
            } catch (err) {
                res.status(500).send('error saving the user to the database')
            }
        }
        saveUser();
        res.status(201).send('user register successfully');
    } catch (err) {
        res.status(500).send('Erro occurred registering the user');
    }
}

export const login = async (req, userValidator ,res) => {
    res.send('Register route');
}

export default {
    login, 
    register 
};