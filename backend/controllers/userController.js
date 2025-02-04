const User = require("../models/userModel");
const AppliedUsers = require("../models/appliedUser");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Correct way to find one user by email

    if (!user) {
      return res.status(400).send({ message: "User not found" }); // User not found message
    }

    if (user.password !== password) {
      return res.status(400).send({ message: "Invalid credentials" }); // Invalid password
    }

    // Optionally generate a token or do other login-related tasks here
    return res.status(200).send({ message: "Login successful", user }); // Return user or token
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the new user
    const user = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Return the response with user data and token
    return res.status(201).send({ message: "Registration successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBusPass = async (req, res) => {
  try {
    const { userID, busPass } = req.body;
    const user = await User.findById(userID);
    user.busPass = busPass;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addUserToAppliedList = async (req, res) => {
  try {
    const { userId } = req.body; // Expecting a single user ID

    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID." });
    }

    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the AppliedUsers document (or create one if it doesn't exist)
    let appliedUsers = await AppliedUsers.findOne();
    if (!appliedUsers) {
      appliedUsers = new AppliedUsers(); // Create a new document if not found
    }

    // Add the user to the array using $addToSet to prevent duplicates
    if (!appliedUsers.users.includes(userId)) {
      appliedUsers.users.push(userId);
      await appliedUsers.save();
      return res
        .status(200)
        .json({ message: "User added successfully", appliedUsers });
    } else {
      return res
        .status(400)
        .json({ message: "User already exists in the list" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  register,
  getSingleUser,
  updateBusPass,
  addUserToAppliedList,
};
