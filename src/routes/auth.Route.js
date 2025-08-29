import express from 'express';
const authRouter = express.Router();

// Import controller functions
import  { login, register } from '../controllers/auth.Controller.js';

authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;