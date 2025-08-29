import express from 'express';
const app = express();
import cors from 'cors';
// import path
import connectDB  from './config/db.js';

// set the view engine to ejs
app.set('view engine', 'ejs');


import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
import authRouter  from './src/routes/auth.Route.js';

app.get('/', (req, res)=>{
    res.render('index.ejs')
})
app.use('/', authRouter);

const initializeApp = async () =>{
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
        console.log('###############################################')
    });
}
initializeApp()