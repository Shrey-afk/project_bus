const Conductor = require("../models/conductorModel");
const Bus = require("../models/busModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const conductor = await Conductor.findOne({ email }); // Correct way to find one user by email

    if (!conductor) {
      return res.status(400).send({ message: "Conductor not found" }); // User not found message
    }

    if (conductor.password !== password) {
      return res.status(400).send({ message: "Invalid credentials" }); // Invalid password
    }

    // Optionally generate a token or do other login-related tasks here
    return res.status(200).send({ message: "Login successful", conductor }); // Return user or token
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingConductor = await Conductor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the new user
    const user = new Conductor({
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

const assignBus = async (req, res) => {
  try {
    const { conductorID, busID } = req.body;
    const conductor = await Conductor.findById(conductorID);
    conductor.assignedBus = busID;
    await conductor.save();
    return res.status(200).json(conductor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteAssignedBus = async (req, res) => {
  try {
    const { conductorId } = req.params; // Get conductorId from URL parameters

    // Find the conductor by ID
    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    // Check if the conductor already has an assigned bus
    if (!conductor.assignedBus) {
      return res
        .status(400)
        .json({ message: "No bus assigned to this conductor" });
    }

    // Remove the assigned bus by setting the assignedBus field to null
    conductor.assignedBus = null;
    await conductor.save(); // Save the updated conductor document

    return res
      .status(200)
      .json({ message: "Assigned bus deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, register, assignBus, deleteAssignedBus };
