const express = require("express");
const AdminController = require("../controllers/AdminController");
const authenticate = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.get(
  "/getPendingCompanies",
  authenticate([2]), //Admin Can Access
  AdminController.GetPendingCompanies
);
router.get(
  "/getAllUsers",
  authenticate([2]), //Admin Can Access
  AdminController.GetAllUsers
);
router.get(
  "/getAllCompanies",
  authenticate([2]), //Admin Can Access
  AdminController.GetAllCompanies
);

router.post(
  "/approveCompany",
  authenticate([2]), //Admin Can Access
  AdminController.ApproveCompany
);
router.post(
  "/rejectCompany",
  authenticate([2]), //Admin Can Access
  AdminController.RejectCompany
);

module.exports = router;
