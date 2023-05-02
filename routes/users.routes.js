

const express=require("express")

const userRouter=express.Router()
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/users.model");
const jwt=require("jsonwebtoken")


// *********REGISTER-THE USER LOGIC
userRouter.post("/register",async(req,res)=>{

       const {email,password,gender,name}=req.body
      try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user= new UserModel({email,name,gender,password:hash})
              await user.save()
              res.status(200).send({"msg":"nes-user gets registered sucessfully"})
        });
        
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})


// *********LOGIN-THE USER LOGIC
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user= await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password,user.password, (err, result)=>{
                if(result){
                    const token=jwt.sign({authorID:user._id,author:user.name}, "masai")
                    res.status(200).send({"msg":"login successful","token":token})
                }else{
                    res.status(200).send({"msg":"wrong input!"})
                }   
            });
            
        }else{
            res.status(200).send({"msg":"wrong input!"})
        }

    } catch (error) {
        res.status(400).send({"msb":error.message})
    }
})


module.exports={
    userRouter
}