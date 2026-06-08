require("dotenv").config();

const nodemailer =
require("nodemailer");



const transporter =
nodemailer.createTransport({

 host:"smtp.gmail.com",

 port:587,

 secure:false,

 auth:{
   user:
   process.env.EMAIL_USER,

   pass:
   process.env.EMAIL_PASS
 }

});

const sendMail =
async(to,subject,html)=>{

 let newMail={

   from:
   process.env.EMAIL_USER,

   to,

   subject,

   html
 };

 return await
 transporter.sendMail(
   newMail
 );

};

module.exports =
sendMail;