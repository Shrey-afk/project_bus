const express = require("express");
const {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  changePassword,
} = require("../controllers/userController");

const router = express.Router();

// Routes
router.post("/login", loginUser); // Create User
router.post("/register", registerUser); // Create User
router.post("/delete", deleteUser); // Delete User
router.post("/updatePassword", changePassword); // Update Password
router.get("/getAll", getAllUsers); // Get All Users
router.post("/getSingle", getSingleUser); // Get Single User

module.exports = router;
