const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
// router.post("/verifyAuth", AuthController.verifyAuth);
// router.post("/logout", AuthController.Logout);

// router.get("/google", AuthController.googleGetAuth);
module.exports = router;
