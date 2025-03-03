const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({ newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @desc   Create User
// @route  POST /api/users/create
exports.loginUser = async (req, res) => {
  try {
    // Check if user already exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dosent exists" });
    }
    if (user?.password != password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete User
// @route  POST /api/users/delete
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get All Users
// @route  POST /api/users/getAll
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get Single User
// @route  POST /api/users/getSingle
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.addBus = async (req, res) => {
  try {
    const { userID, busID } = req.body;
    const user = await User.findById(userID);
    user?.travelHistory.push(busID);
    await user.save();
    return res.status(200).send({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
