const CompanyModel = require("../models/CompanyModel");
const UserModel = require("../models/AuthModel");
const FriendshipModel = require("../models/FriendshipModel");
const CompanyStatusModel = require("../models/CompanyStatusModel");
const { createToken } = require("../config/jwtTokens");

class UserController {
  GetPendingRequests = async (req, res) => {
    const { id } = req.params;
    console.log("Send Request", req.body, id);
    try {
      // Here we will also fetch the USER data(name etc) for every recieved request from the User model too
      const pendingRequests = await FriendshipModel.find({ reciever: id });
      res.status(200).json({
        success: true,
        data: {
          message: "Pending Requests Fetched Successfully",
          data: pendingRequests,
        },
      });
    } catch (error) {
      console.log("Error : ", error.message);
      res.status(400).json({ success: false, error: "Error Sending Request" });
    }
  };
  SendFriendRequest = async (req, res) => {
    console.log("Send Request", req.body);
    try {
      await FriendshipModel.create({ ...req.body });
      res.status(200).json({
        success: true,
        data: {
          message: "Request Sent Successfully",
          data: null,
        },
      });
    } catch (error) {
      console.log("Error : ", error.message);
      res.status(400).json({ success: false, error: "Error Sending Request" });
    }
  };
  ApproveFriendRequest = async (req, res) => {
    console.log("Approve Friend Request", req.body);
    const { sender, reciever } = req.body;
    try {
      await FriendshipModel.updateOne(
        { sender: sender, reciever: reciever },
        { status: 1 }
      );
      console.log("APPROVEDDDD : ");
      res.status(200).json({
        success: true,
        data: {
          message: "Friend Request Accepted",
          data: null,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Accepting Request" });
    }
  };
  DenyFriendRequest = async (req, res) => {
    console.log("Register Company", req.body);
    const { sender, reciever } = req.body;
    try {
      await FriendshipModel.deleteOne({ sender: sender, reciever: reciever });
      console.log("DENIEDDDDDDD :");
      res.status(200).json({
        success: true,
        data: {
          message: "Friend Request Denied",
          data: null,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Denied Friend Request" });
    }
  };
  GetCompanyStatus = async (req, res) => {
    const { id } = req.params;
    console.log("Send Request", req.params, id);
    try {
      const companyStatus = await CompanyStatusModel.findOne({ user: id });
      res.status(200).json({
        success: true,
        data: {
          message: "Data Fetched Successfully",
          data: companyStatus,
        },
      });
    } catch (error) {
      console.log("Error : ", error.message);
      res.status(400).json({ success: false, error: "Error Sending Request" });
    }
  };
  ReplaceToken = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id).populate("companyProfile");
      console.log("Send Request", user, id);
      const token = await createToken({
        email: user.email,
        id: user._id,
        role: user.role,
      });
      res.status(200).json({
        success: true,
        data: {
          message: "Replace Token Success",
          data: { user, token },
        },
      });
    } catch (error) {
      console.log("Error : ", error.message);
      res.status(400).json({ success: false, error: "Error Replace token" });
    }
  };
}

module.exports = new UserController();
