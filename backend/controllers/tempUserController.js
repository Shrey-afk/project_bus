const tempUser = require("../models/tempUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Create a Temporary User
exports.createTempUser = async (req, res) => {
  try {
    const {
      email,
      fullName,
      fatherOrHusbandName,
      age,
      mobileNumber,
      gender,
      address,
      studentOrGeneral,
      applicantPhoto,
      idProofType,
      idProofAttachment,
      typeOfBusPass,
      validityOfPass,
      approved,
    } = req.body;

    const newUser = new tempUser({
      email,
      fullName,
      fatherOrHusbandName,
      age,
      mobileNumber,
      gender,
      address,
      studentOrGeneral,
      applicantPhoto,
      idProofType,
      idProofAttachment,
      typeOfBusPass,
      validityOfPass,
      approved,
    });

    const user = await tempUser.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    await newUser.save();
    res.status(201).json({ message: "Temporary user created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Temporary User
exports.deleteTempUser = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await tempUser.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTempUsers = async (req, res) => {
  try {
    const allTempUsers = await tempUser.find();
    return res.status(200).send({ allTempUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
