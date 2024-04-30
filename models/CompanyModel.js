const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyName: { type: String, required: true },
    telephone1: { type: String, required: true },
    telephone2: { type: String, required: false },
    faxNumber: { type: String, required: false },
    email: { type: String, required: true },
    licensePdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FileUpload",
      required: true,
    },
    vacPdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FileUpload",
      required: false,
    },
    description: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    website: { type: String, required: false },
    location: { type: String, required: true },
    categories: { type: [String], required: true },
    status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0 => Pending // 1 => Approved // 2 => Denied
    denialReason: { type: String },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
