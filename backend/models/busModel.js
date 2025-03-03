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
    date: {
      type: String,
    },
    departureTime: {
      type: String,
    },
    // conductor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Conductor",
    // },
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
