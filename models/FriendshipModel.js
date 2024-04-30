const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    status: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], // 0 => Pending // 1 => Approved // 2 => Denied
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friendship", friendshipSchema);
