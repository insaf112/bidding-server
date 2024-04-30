const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter a Password"],
      min: [6, "Minimum Password length is 6 Characters"],
    },
    companyProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    role: {
      type: Number,
      required: true,
      default: 0,
      enum: [0, 1, 2], // 0 => Normal User // 1 => Company User // 2 => Admin
    }, //
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
