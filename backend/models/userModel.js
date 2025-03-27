const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    applicantPhoto: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1743088293~exp=1743091893~hmac=44eb08b327bd26430ed107a817c7817097380f7f25f56e90108fbf1f5e86f89b&w=826",
    },
    idProofType: { type: String, required: true },
    idProofAttachment: { type: String, required: true },
    password: {
      type: String,
    },
    typeOfBusPass: {
      type: String,
      required: true,
    },
    validityOfPass: {
      type: Number,
      required: true,
    },
    busPass: {
      type: String,
    },
    complaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],
    travelHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
