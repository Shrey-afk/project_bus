const mongoose = require("mongoose");

const conductorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    bus: {
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
