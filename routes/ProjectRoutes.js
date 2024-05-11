const express = require("express");
const ProjectController = require("../controllers/ProjectController");
const { uploadMulti } = require("../middlewares/MulterMiddleware");
const router = express.Router();

router.post("/post", uploadMulti.array("files"), ProjectController.PostProject);
router.get("/:id", ProjectController.GetProject);
// router.post("/sendFriendRequest", ProjectController.SendFriendRequest);
// router.post("/approveFriendRequest", ProjectController.ApproveFriendRequest);
// router.post("/denyFriendRequest", ProjectController.DenyFriendRequest);

module.exports = router;
