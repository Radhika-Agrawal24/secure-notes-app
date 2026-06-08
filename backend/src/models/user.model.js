const mongoose=require("mongoose");
const bcrypt=require('bcrypt')
const generateToken = require("../utils/generateToken");
const jwt= require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,   
        unique:true,       
        },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    
})
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function() {
  return generateToken(this);
};
module.exports= mongoose.model("User",userSchema);


    
