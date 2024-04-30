const express = require("express");
const CompanyController = require("../controllers/CompanyController");
const { upload } = require("../middlewares/MulterMiddleware");
const router = express.Router();

router.post(
  "/registerCompany",
  upload.fields([{ name: "licensePdf" }, { name: "vacPdf" }]),
  CompanyController.RegisterCompany
);
router.get("/getCompanies", CompanyController.GetCompanies);
router.get("/getCompanies/:id", CompanyController.GetOneCompany);
// router.post("/verifyAuth", AuthController.verifyAuth);
// router.post("/logout", AuthController.Logout);

// router.get("/google", AuthController.googleGetAuth);
module.exports = router;
