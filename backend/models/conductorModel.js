const mongoose = require("mongoose");

const conductorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    assignedBus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
  },
  {
    timestamps: true,
  }
);

const Conductor = mongoose.model("Conductor", conductorSchema);
module.exports = Conductor;
