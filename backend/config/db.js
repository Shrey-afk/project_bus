const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://shreyproject4:shreyproject4@cluster0.bmshq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
