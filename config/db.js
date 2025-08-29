import mongoose  from "mongoose";

import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI
if(!MONGO_URI){
    console.log("Error accessing database connection string...");
    process.exit(1);
}

const connectDB = async () => {
        try{
            await mongoose.connect(MONGO_URI,{
              useNewUrlParser: true, 
              useUnifiedTopology: true
            })
            console.log("Database connected successfully...");
        }catch(err){
            console.log('error occured connectiong to database...');
            process.exit(1);
        }
}

export default connectDB