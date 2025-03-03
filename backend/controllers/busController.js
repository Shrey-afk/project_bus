const Bus = require("../models/busModel");

// @desc   Create a new bus
// @route  POST /api/buses/create
exports.createBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({ message: "Bus created successfully", bus: newBus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a bus
// @route  DELETE /api/buses/delete
exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.body;
    const bus = await Bus.findById(id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await bus.deleteOne();
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a bus
// @route  PUT /api/buses/update
exports.updateBus = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res
      .status(200)
      .json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.allBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    return res.status(200).send({ buses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
