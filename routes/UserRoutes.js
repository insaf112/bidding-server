const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/getPendingRequests/:id", UserController.GetPendingRequests);
router.get("/getCompanyStatus/:id", UserController.GetCompanyStatus);
router.get("/replaceToken/:id", UserController.ReplaceToken);

router.post("/sendFriendRequest", UserController.SendFriendRequest);
router.post("/approveFriendRequest", UserController.ApproveFriendRequest);
router.post("/denyFriendRequest", UserController.DenyFriendRequest);
// router.post("/verifyAuth", AuthController.verifyAuth);
// router.post("/logout", AuthController.Logout);

// router.get("/google", AuthController.googleGetAuth);
module.exports = router;
