const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
const cacheInstance= require('../services/cache.services')
const sendMail = require('../services/mail.services');
require("dotenv").config();
const bcrypt=require('bcrypt')
const resetPassTemplate = require('../utils/mail.template.js');

const registerController=async(req,res)=>{
    try{
let {name,email,password,role}=req.body;
if(!name || !email || !password||!role){
    return res.status(401).json
    ({message:"All fields are required"});
}
let existinguser=await userModel.findOne({email});
if(existinguser){
    return res.status(409).json({message:"User already exists"});
}
let user=await userModel.create({
    name,email,password,role

})
let token=user.generateToken();
res.cookie("token",token,{httpOnly:true});
return res.status(201).json({
    message:"user created "
    
})
    }
    catch(error){
        res.status(500).json({message:"Error in registering user",error:error.message})
    }   
};
const loginController=async(req,res)=>{
    try{
let {email,password}=req.body;
if(!email||!password){
    return res.status(401).json({message:"All fields are required"});
}
let user=await userModel.findOne({email});
if(!user){
    res.status(404).json({
        message:"user not found"
    })}
    let isMatch=await user.comparePassword(password);
     if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }
    let token=user.generateToken();
    res.cookie('token',token ,{httponly:true})
return res.status(200).json({ message: 'User logged in successfully' });


    }
    catch(error){
        res.status(500).json({message:"Error in login user",error:error.message})
    }}
    const logoutController=async(req,res)=>{
        try{
let token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"Unauthorized"});
}
await cacheInstance.set(token,'blacklist','EX',3600);
res.clearCookie("token");
return res.status(200).json({message:"User logged out successfully"});
        }
        catch(error){
            console.log("error in logout controller:",error);
            res.status(500).json({
                message:"error in logout user",
                error:error.message,
            })
        }
    }
    const forgetPasswordController=async(req,res)=>{
        try{
            let{email}=req.body;
            if(!email){
                return res.status(401).json({message:"Email is required"});
            }
            let user=await userModel.findOne({email});
if(!user){
return res.status(401).json({
    message:"user not found",
    error:error.message,
})}
let rawToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:'20m',
})
let resetLink=`http://localhost:5000/api/auth/reset-password/${rawToken}`;
  let emailTemp = resetPassTemplate(user.name, resetLink);

    await sendMail(email, 'Reset Password', emailTemp);

    return res.status(200).json({ message: 'Reset link sent successfully' });
        }
        catch(error){
            console.log("error in forget password controller:",error);
            res.status(500).json({
                message:"error in forget password controller",
                error:error.message,
            })
        
        }}
        const resetPasswordController=async(req,res)=>{
            try{
                let {token}=req.params;
                let {newPassword}=req.body;

                if(!token||!newPassword){
                    return res.status(401).json({message:"All fields are required"});
                }
                let decode=jwt.verify(token,process.env.JWT_SECRET);
                if(!decode){
                    return res.status(401).json({message:"Invalid or expired token"});
                }
                let user=await userModel.findById(decode.id);
                if(!user){
                    return res.status(404).json({message:"User not found"});
                }
                user.password=newPassword;
                await user.save();
                return res.status(200).json({message:"Password reset successfully"});
            }
            catch(error){
                console.log("error in reset password controller:",error);
                res.status(500).json({
                    message:"Error in reset password controller",
                    error:error.message,
                })
            }
        }


module.exports={registerController,loginController,logoutController,forgetPasswordController,resetPasswordController    };