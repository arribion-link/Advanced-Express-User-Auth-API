Advanced User Express.Js User Authentication API for Beginners


# Ininializing the project
$ npm init
$ npm i express dotenv jsonwebtoken bcrypt body-parser cors ejs mongoose
$ npm i -D nodemon

# setting and testing the initial api

Open the package.json 
Add type to module ( "type": "module" ) to be able to use ES6 import 

# index.js
import express from 'express';
const app = express();

app.get("/", (req, res)=>{
  res.send("Api Working")
}

app.listen(3001, ()=>{
  console.log('app running successfully on port 3001')
}

