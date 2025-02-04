const mongoose = require("mongoose");

const appliedUsersSchema = new mongoose.Schema(
  {
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

const AppliedUsers = mongoose.model("AppliedUsers", appliedUsersSchema);
module.exports = AppliedUsers;
