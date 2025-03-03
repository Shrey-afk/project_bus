const Complaint = require("../models/complaintsModel");

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { complaint, userId } = req.body;

    if (!complaint) {
      return res.status(400).json({ message: "Complaint is required" });
    }

    const newComplaint = new Complaint({
      complaint,
      user: userId,
    });

    await newComplaint.save();
    res
      .status(201)
      .json({ message: "Complaint created successfully", newComplaint });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.body;
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Check if the logged-in user owns the complaint (if needed)
    if (complaint.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this complaint" });
    }

    await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user");
    return res.status(200).send({ complaints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createComplaint, deleteComplaint, getAllComplaints };
