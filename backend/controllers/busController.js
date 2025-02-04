const Bus = require("../models/busModel");
const User = require("../models/userModel");
const Conductor = require("../models/conductorModel");

// 1. Add a new bus
const addBus = async (req, res) => {
  try {
    const { name, from, to, stops } = req.body;
    const bus = new Bus({ name, from, to, stops });
    await bus.save();
    return res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 2. Delete a bus by its ID
const deleteBus = async (req, res) => {
  try {
    const { busId } = req.body; // Get busId from URL parameters
    const bus = await Bus.findByIdAndDelete(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    return res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 3. Update a bus by its ID
const updateBus = async (req, res) => {
  try {
    const { busId } = req.body; // Get busId from URL parameters
    const { name, from, to, stops } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    bus.name = name || bus.name;
    bus.from = from || bus.from;
    bus.to = to || bus.to;
    bus.stops = stops || bus.stops;

    await bus.save();
    return res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 4. Add passengers to a bus
const addPassengers = async (req, res) => {
  try {
    const { busId } = req.body;
    const { passengerIds } = req.body; // Assuming passengerIds is an array of user IDs

    // Check if bus exists
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Check if passengers exist and add them
    const users = await User.find({ _id: { $in: passengerIds } });
    if (users.length !== passengerIds.length) {
      return res
        .status(404)
        .json({ message: "One or more passengers not found" });
    }

    // Add passengers to the bus
    bus.passengers.push(...passengerIds);
    await bus.save();

    return res
      .status(200)
      .json({ message: "Passengers added successfully", bus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 5. Add a conductor to a bus
const addConductor = async (req, res) => {
  try {
    const { busId } = req.body;
    const { conductorId } = req.body; // Assuming conductorId is a single ID

    // Check if bus exists
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Check if conductor exists
    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor not found" });
    }

    // Assign conductor to the bus
    bus.conductor = conductorId;
    await bus.save();

    return res
      .status(200)
      .json({ message: "Conductor added to bus successfully", bus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addBus,
  deleteBus,
  updateBus,
  addPassengers,
  addConductor,
};
