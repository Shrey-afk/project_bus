const Conductor = require("../models/conductorModel");

// Register a new conductor
const registerConductor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the conductor already exists
    const existingConductor = await Conductor.findOne({ email });
    if (existingConductor) {
      return res.status(400).json({ message: "Conductor already exists" });
    }

    // Create a new conductor
    const conductor = new Conductor({ name, email, password });
    await conductor.save();

    res
      .status(201)
      .json({ message: "Conductor registered successfully", conductor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering conductor", error: error.message });
  }
};

// Login a conductor
const loginConductor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the conductor by email and password
    const conductor = await Conductor.findOne({ email, password });
    if (!conductor) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", conductor });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get a single conductor by ID
const getSingleConductor = async (req, res) => {
  try {
    const { id } = req.body;

    const conductor = await Conductor.findById(id).populate({
      path: "bus",
      populate: { path: "users" }, // Populating the users inside the bus
    });

    console.log(conductor?.bus);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    res.status(200).json({ conductor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conductor", error: error.message });
  }
};

// Get all conductors
const getAllConductors = async (req, res) => {
  try {
    const conductors = await Conductor.find().populate("bus");
    res.status(200).json({ conductors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conductors", error: error.message });
  }
};

// Add a bus to a conductor
const addBus = async (req, res) => {
  try {
    const { conductorId, busId } = req.body;

    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    conductor.bus = busId;
    await conductor.save();

    res
      .status(200)
      .json({ message: "Bus added to conductor successfully", conductor });
  } catch (error) {
    res.status(500).json({ message: "Error adding bus", error: error.message });
  }
};

// Update a conductor's bus
const updateBus = async (req, res) => {
  try {
    const { conductorId, busId } = req.body;

    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    conductor.bus = busId;
    await conductor.save();

    res.status(200).json({ message: "Bus updated successfully", conductor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating bus", error: error.message });
  }
};

// Delete a conductor's bus
const deleteBus = async (req, res) => {
  try {
    const { conductorId } = req.body;

    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    conductor.bus = null;
    await conductor.save();

    res.status(200).json({ message: "Bus deleted successfully", conductor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting bus", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conductor = await Conductor.findOne({ email });

    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    conductor.password = newPassword;
    await conductor.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  registerConductor,
  loginConductor,
  getSingleConductor,
  getAllConductors,
  addBus,
  updateBus,
  deleteBus,
  changePassword,
};
