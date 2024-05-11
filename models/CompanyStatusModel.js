const mongoose = require("mongoose");

const companyRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0 => Pending // 1 => Approved // 2 => Denied
    denialReason: { type: String }, // Field to store the reason for denial
  },
  { timestamps: true }
);

const CompanyStatusModel = mongoose.model(
  "CompanyStatus",
  companyRequestSchema
);
module.exports = CompanyStatusModel;
