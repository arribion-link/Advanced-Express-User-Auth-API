import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// user model
import user from '../models/authSchema.js'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.log('error fetching jwt secret');
    process.exit(1);
}


export const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Server error");
  }
};



// login the user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await user.findOne({ email });
        await bcrypt.compare(password, userFound.password);
        
        const token = jwt.sign({ userId: userFound._id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        
        res.send('loged in successfully');
        res.status(200).json({ token })

    } catch (err) {
        
    }
}

export default {
    login, 
    register 
};