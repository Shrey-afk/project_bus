const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");

const addComplaint = async (req, res) => {
  try {
    const { userId, complaint } = req.bdoy;
    const newComplaint = new Complaint({ user: userId, complaint: complaint });
    await newComplaint.save();
    const user = await User.findById(userId);
    user.complaints.push(newComplaint);
    await user.save();
    return res.status(200).send({
      message: "Successfully added complaint!!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { userId, complaintId } = req.params; // Assuming you're passing both userId and complaintId in the URL

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the complaint exists in the user's complaints array
    if (!user.complaints.includes(complaintId)) {
      return res
        .status(404)
        .json({ message: "Complaint not found for this user" });
    }

    // Use the $pull operator to remove the complaint ID from the user's complaints array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { complaints: complaintId } },
      { new: true }
    );

    // Delete the complaint document itself
    await Complaint.findByIdAndDelete(complaintId);

    return res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    return res.status(200).json(complaints);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { addComplaint, deleteComplaint, getAllComplaints };
