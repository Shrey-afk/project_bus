const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaint: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
