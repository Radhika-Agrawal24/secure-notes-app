require("dotenv").config();
const express= require('express');
const connectDB = require('./src/db/database');
const cors = require("cors");
const app= express();
const authRoutes=require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");
const noteRoutes=require("./src/routes/note.route");
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT || 5000;
connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use("/api/auth", authRoutes);
app.use(
"/notes",noteRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
  }
)

  