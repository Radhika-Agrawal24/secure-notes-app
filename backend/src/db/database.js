
const mongoose = require("mongoose");
require ("dotenv").config();
const connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URL);

    if (res) {
      console.log("MongoDB Connected");
    }
  } catch (error) {
    console.log("error in mongodb connection->", error);
  }
};

module.exports = connectDB;
