const express = require("express");
const AuthRoutes = require("./AuthRoutes");
const CompanyRoutes = require("./CompanyRoutes");
const AdminRoutes = require("./AdminRoutes");
const UserRoutes = require("./UserRoutes");
const ProjectRoutes = require("./ProjectRoutes");
// const userRoutes = require("./userRoutes");
// const shopRoutes = require("./shopRoutes");
// const productRoutes = require("./productRoutes");
// const searchRoutes = require("./searchRoutes");

const router = express.Router();

// Define routes
router.use("/auth", AuthRoutes);
router.use("/company", CompanyRoutes);
router.use("/admin", AdminRoutes);
router.use("/user", UserRoutes);
router.use("/project", ProjectRoutes);
// router.use("/shop", shopRoutes);
// router.use("/product", productRoutes);

module.exports = router;
