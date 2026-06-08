const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const redisInstance = require("../services/cache.services");
const authMiddleware=async(req,res,next)=>{
    try{
let token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"Unauthorized"});
}
   let isBlacklisted = await redisInstance.get(token);

    if (isBlacklisted)
      return res.status(404).json({
        message: "token blacklist kardiya mene ",
      });
let decode=jwt.verify(token,process.env.JWT_SECRET);
if(!decode){
    res.status(401).json({message:"Unauthorized"});
}
let user=await userModel.findById(decode.id);
req.user=user;
next();
    }
    catch(error){
        res.status(500).json({message:"Error in auth middleware",error:error.message})
    }
}
module.exports= authMiddleware;
