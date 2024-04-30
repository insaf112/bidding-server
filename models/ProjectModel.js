const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true },
    bidBasePrice: { type: Number, required: true },
    workStartDate: { type: Date, required: true },
    workEndDate: { type: Date, required: true },
    bidStartTime: { type: Date, required: true },
    bidEndTime: { type: Date, required: true },
    bidReductionRate: { type: Number, required: true },
    publicProject: { type: Boolean, required: true },
    files: { type: [String], required: false },
    // status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0 => Pending // 1 => Approved // 2 => Denied
    // denialReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
