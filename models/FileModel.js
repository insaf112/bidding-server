const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const FileModel = mongoose.model("FileUpload", fileUploadSchema);
module.exports = FileModel;
