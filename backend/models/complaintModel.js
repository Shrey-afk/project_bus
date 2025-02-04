const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    complaint: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complainSchema);
module.exports = Complaint;
