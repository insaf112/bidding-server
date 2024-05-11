const express = require("express");
const CompanyController = require("../controllers/CompanyController");
const { upload } = require("../middlewares/MulterMiddleware");
const authenticate = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post(
  "/registerCompany",
  upload.fields([{ name: "licensePdf" }, { name: "vacPdf" }]),
  CompanyController.RegisterCompany
);
router.get(
  "/getCompanies",
  authenticate([2]), //Admin Can Access
  CompanyController.GetCompanies
);
router.get(
  "/getOthersCompanies/:id",
  authenticate([1]), // Company Can Access
  CompanyController.GetOthersCompanies
);
router.get(
  "/getCompanies/:id",
  authenticate([1, 2]), // Company & Admin Can Access
  CompanyController.GetOneCompany
);
router.get(
  "/getAllProjects/:companyId",
  authenticate([1, 2]), // Company & Admin Can Access
  CompanyController.GetAllProjects
);

module.exports = router;
