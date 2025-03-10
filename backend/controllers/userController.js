
const asyncHandler = require("express-async-handler")
const bcrypt =require('bcrypt')//used to hash the password
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userController={
    register:asyncHandler(async(req,res)=>{
        const {name, email, password}=req.body
        if(!name ||!email ||!password){
            throw new Error("Data incomplete")
        }

        const existingUser = await User.findOne({ email });//use findOnedontuse find because find return array so we cant show error msg
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return; // Stop further execution
  }
        const hassedPassword = await bcrypt.hash(password,10) //7-13 can be used if the value is less security is less but if value great it should take more time to hash
        if(!hassedPassword){
            throw new Error("password doestt hashed")
        }
        const userCreated = await User.create({ 
            email, //use await otherwise it will insert [] 'object' instead if true value
            name,
            password:hassedPassword
        })
        if(!userCreated){
            throw new Error("user is not created")
        }

        const payload={
            id:userCreated._id,
            email:userCreated.email,
            name:userCreated.name
    
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
       
       
       //set cookie
        res.cookie("token",token,{
            http:true,
            secure:false,
            sameSite:"none",
            maxAge:3*24*60*60*1000

        })

        res.json({
            user:userCreated,
            token
        })
    }),

    login:asyncHandler(async(req,res)=>{
        const {email,password}= req.body
        if(!email||!password){
            throw new Error("Data incomplete");
            
        }
        const userFound = await User.findOne({email})
        if(!userFound){
            throw new Error("user didnt exist");
            
        }
        const comparedPassword= await bcrypt.compare(password,userFound.password)
        if(!comparedPassword){
            throw new Error("Password doesnt match");
            
        }

        //generate token

        const payload={
            id:userFound._id,
            email:userFound.email,
            name: userFound.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
            expiresIn:"27h"
        })

        res.cookie("token",token,{
            http:true,
            secure:false,
            sameSite:"none",
            maxAge:3*24*60*60*1000
            

        })

       res.status(201).json({message: "User logged in successfully",token})
        }),

    logout:asyncHandler(async(req,res)=>{
        res.clearCookie("token")
        res.status(201).send("user logout successfully")
    })
    

}


module.exports=userController