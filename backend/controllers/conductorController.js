const Conductor = require("../models/conductorModel");
const Bus = require("../models/busModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Secret key for JWT

// Conductor Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const conductor = await Conductor.findOne({ email });

    if (!conductor) {
      return res.status(400).json({ message: "Conductor not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, conductor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: conductor._id, email: conductor.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ message: "Login successful", token, conductor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Conductor Registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingConductor = await Conductor.findOne({ email });
    if (existingConductor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const conductor = new Conductor({
      name,
      email,
      password: hashedPassword,
    });

    await conductor.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: conductor._id, email: conductor.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(201)
      .json({ message: "Registration successful", token, conductor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Assign Bus to Conductor
const assignBus = async (req, res) => {
  try {
    const { conductorID, busID } = req.body;
    const conductor = await Conductor.findById(conductorID);

    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    conductor.assignedBus = busID;
    await conductor.save();

    return res
      .status(200)
      .json({ message: "Bus assigned successfully", conductor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove Assigned Bus
const deleteAssignedBus = async (req, res) => {
  try {
    const { conductorId } = req.params;
    const conductor = await Conductor.findById(conductorId);

    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    if (!conductor.assignedBus) {
      return res
        .status(400)
        .json({ message: "No bus assigned to this conductor" });
    }

    conductor.assignedBus = null;
    await conductor.save();

    return res
      .status(200)
      .json({ message: "Assigned bus deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { login, register, assignBus, deleteAssignedBus, verifyToken };
