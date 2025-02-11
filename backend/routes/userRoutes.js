const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getSingleUser,
  updateBusPass,
  addUserToAppliedList,
  addData,
} = require("../controllers/userController");

// 1. Login route (POST request)
router.post("/login", login); // POST request to log in a user

// 2. Register route (POST request)
router.post("/register", register); // POST request to register a new user

// 3. Get a single user by ID (POST request)
router.post("/user", getSingleUser); // POST request to get a single user's details

// 4. Update bus pass for a user (POST request)
router.post("/bus-pass", updateBusPass); // POST request to update a user's bus pass

// 5. Add user to applied users list (POST request)
router.post("/applied", addUserToAppliedList); // POST request to add a user to the applied users list

router.post("/addData", addData); // POST request to add a user to the applied users list

module.exports = router;
