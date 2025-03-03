const mongoose = require("mongoose");

const temporaryUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    fullName: { type: String, required: true },
    fatherOrHusbandName: { type: String, required: true },
    age: { type: Number, required: true },
    mobileNumber: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    studentOrGeneral: { type: String, required: true },
    applicantPhoto: { type: String, required: true },
    idProofType: { type: String, required: true },
    idProofAttachment: { type: String, required: true },
    typeOfBusPass: {
      type: String,
      required: true,
    },
    validityOfPass: {
      type: Number,
      required: true,
    },
    approved: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const tempUser = mongoose.model("tempUser", temporaryUserSchema);
module.exports = tempUser;
