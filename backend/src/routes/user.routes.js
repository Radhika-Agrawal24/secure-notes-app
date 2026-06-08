const express=require('express');
const router= express.Router();
const {registerController,loginController,logoutController,forgetPasswordController}=require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.get('/profile',(req,res)=>{
    res.send("User Profile");
})
router.post("/register",registerController);
router.post("/login",authMiddleware,loginController);
router.post("/logout",authMiddleware,logoutController);
router.post("/forget",authMiddleware ,forgetPasswordController)
module.exports= router;