import express from 'express';
const authRouter = express.Router();

// Import controller functions
import { login, register } from '../controllers/auth.Controller.js';

// middleware
import userValidator from '../middlewares/user.Validation.js';

authRouter.post('/login', userValidator  ,login);
authRouter.post('/register', userValidator, register);

export default authRouter;