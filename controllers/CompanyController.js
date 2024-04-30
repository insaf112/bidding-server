const CompanyModel = require("../models/CompanyModel");
const CompanyStatusModel = require("../models/CompanyStatusModel");
const FileModel = require("../models/FileModel");

class CompanyController {
  RegisterCompany = async (req, res) => {
    // console.log("Register Company", req);
    console.log("PASSWORD : ", req.body, "\n", "filessss", req.file, req.files);
    const { userId } = req.body;
    try {
      const licensePdf = await FileModel.create({
        userId,
        ...req.files["licensePdf"][0],
      });
      const vacPdf = await FileModel.create({
        userId,
        ...req.files["vacPdf"][0],
      });

      const company = await CompanyModel.create({
        ...req.body,
        licensePdf: licensePdf._id,
        vacPdf: vacPdf._id,
      });
      console.log("FILES SAVEDDDDDDDDDDDD : ", company);
      const companyStatus = await CompanyStatusModel.create({
        user: userId,
        company: company._id,
        status: 0,
      });
      res.status(201).json({
        success: true,
        data: { message: "User Registered Successfully", data: companyStatus },
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).json({ success: false, error: error.message });
    }
  };
  GetCompanies = async (req, res) => {
    try {
      const companies = await CompanyModel.find({ status: 1 });
      console.log("GET ALLLL CompaniESSSSS", companies);
      res.status(200).json({
        success: true,
        data: { message: "Companies Fetched Successfully", data: companies },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Fetching Companies" });
    }
  };
  GetOneCompany = async (req, res) => {
    const { id } = req.params;
    console.log("GET ONEEEE Company", req.params, id);
    try {
      console.log("PASSWORD : ", req.body);
      const company = await CompanyModel.findById(id)
        .populate("licensePdf")
        .populate("vacPdf");
      res.status(201).json({
        success: true,
        data: { message: "Company Fetched Successfully", data: company },
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
