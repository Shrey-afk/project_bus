const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect("");
    console.log("Connected to Database!!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
