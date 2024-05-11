const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload",
        required: false,
      },
    ],
    status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0 => Pending // 1 => Start // 2 => Complete
    // denialReason: { type: String },
  },
  { timestamps: true }
);
// Virtual property to automatically update bidding status based on current time
projectSchema.virtual("updateStatus").get(function () {
  const currentTime = new Date();
  if (this.bidStartTime <= currentTime && currentTime < this.bidEndTime) {
    this.status = 1;
  } else if (currentTime >= this.bidEndTime) {
    this.status = 3;
  }
});
const ProjectModel = mongoose.model("Project", projectSchema);
module.exports = ProjectModel;
