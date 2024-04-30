const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/getPendingCompanies", AdminController.GetPendingCompanies);
router.get("/getAllUsers", AdminController.GetAllUsers);
router.post("/approveCompany", AdminController.ApproveCompany);
router.post("/rejectCompany", AdminController.RejectCompany);
// router.post("/getCompanies/:id", AdminController.RegisterCompany);
// router.post("/verifyAuth", AuthController.verifyAuth);
// router.post("/logout", AuthController.Logout);

// router.get("/google", AuthController.googleGetAuth);
module.exports = router;
