const CompanyModel = require("../models/CompanyModel");
const UserModel = require("../models/AuthModel");
const CompanyStatusModel = require("../models/CompanyStatusModel");
const path = require("path");
const fs = require("fs");
const FileModel = require("../models/FileModel");

const removeFiles = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(`Error deleting file :`, err);
    } else {
      console.log(`File deleted successfully`);
    }
  });
};

class CompanyController {
  GetPendingCompanies = async (req, res) => {
    console.log("Register Company", req.body);
    try {
      console.log("PASSWORD : ", req.body);
      const pendingCompanies = await CompanyModel.find({ status: 0 });
      res.status(201).json({
        success: true,
        data: {
          message: "Companies Fetched Successfully",
          data: pendingCompanies,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Fetching Companies" });
    }
  };
  ApproveCompany = async (req, res) => {
    console.log("Register Company", req.body);
    try {
      const { companyId } = req.body;

      const company = await CompanyModel.findByIdAndUpdate(companyId, {
        status: 1,
      });
      await CompanyStatusModel.findOneAndUpdate(
        { user: company.userId },
        { status: 1 }
      );

      // Update the status of the user to indicate company approval
      await UserModel.findByIdAndUpdate(company.userId, {
        role: 1,
        companyProfile: companyId,
      });

      // Optionally, perform additional actions here

      res.status(200).json({
        success: true,
        message: "Company registration accepted successfully.",
      });
    } catch (error) {
      console.error("Error accepting company registration:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  };
  RejectCompany = async (req, res) => {
    try {
      // Later we can preserve the company details / status without deleting it,
      //  and allow the user to retry again
      const { companyId } = req.body;
      const denialReason = "Please Try Again. Your company license is expired.";

      // Update the status of the company to denied
      const company = await CompanyModel.findByIdAndDelete(companyId)
        .populate("licensePdf")
        .populate("vacPdf");

      // Save the reason for denial in the CompanyStatus model
      await CompanyStatusModel.deleteOne({ user: company.userId });
      //   Get the files info from the company
      const file1 = path.join(
        __dirname,
        "../uploads",
        company.licensePdf.filename
      );
      const file2 = path.join(__dirname, "../uploads", company.vacPdf.filename);
      console.log("Register Company", req.body, company, "\n", file1, file2);
      await removeFiles(file1);
      await removeFiles(file2);
      await FileModel.deleteMany({ userId: company.userId });

      res.status(200).json({
        success: true,
        message: "Company registration rejected successfully.",
      });
    } catch (error) {
      console.error("Error rejecting company registration:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  };
  GetAllUsers = async (req, res) => {
    console.log("Register Company", req.body);
    try {
      const pendingUsers = await UserModel.find({ role: 0 });
      console.log("PASSWORD : ", pendingUsers);
      res.status(201).json({
        success: true,
        data: {
          message: "Users Fetched Successfully",
          data: pendingUsers,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).json({ success: false, error: "Error Fetching Users" });
    }
  };
  GetAllCompanies = async (req, res) => {
    console.log("All Company", req.body);
    try {
      const allCompanies = await CompanyModel.find({ status: 1 });
      res.status(201).json({
        success: true,
        data: {
          message: "Companies Fetched Successfully",
          data: allCompanies,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Fetching Companies" });
    }
  };
}

module.exports = new CompanyController();
