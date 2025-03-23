const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    firstBus: {
      type: String,
    },
    lastBus: {
      type: String,
    },
    description: {
      type: String,
    },
    departureTime: {
      type: String,
    },
    arrivalTime: {
      type: String,
    },
    routes: {
      type: String,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;
