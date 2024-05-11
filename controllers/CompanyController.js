const CompanyModel = require("../models/CompanyModel");
const CompanyStatusModel = require("../models/CompanyStatusModel");
const FileModel = require("../models/FileModel");
const FriendshipModel = require("../models/FriendshipModel");
const ProjectModel = require("../models/ProjectModel");

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
  GetOthersCompanies = async (req, res) => {
    const { id } = req.params;
    console.log("GET OTHERSS CompaniESSSSS", req.params);
    try {
      // Check And exclude the already friends
      const friends = await FriendshipModel.find({
        $or: [{ sender: id }, { reciever: id }],
        status: { $in: [0, 1] }, // Assuming status 1 represents approved friendships
      });
      const friendIds = friends.map((friendship) =>
        friendship.sender.equals(id) ? friendship.reciever : friendship.sender
      );

      const companies = await CompanyModel.find({
        $and: [
          { _id: { $ne: id } }, // Exclude the company with the specified ID
          { _id: { $nin: friendIds } }, // Exclude companies the user is friends with
        ],
      });
      console.log("GET ALLLL CompaniESSSSS", companies, friendIds);
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
    try {
      console.log("PASSWORD : ", id);
      const company = await CompanyModel.findById(id)
        .populate("licensePdf")
        .populate("vacPdf");
      console.log("GET ONEEEE Company", company);
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

  GetAllProjects = async (req, res) => {
    const { companyId } = req.params;
    console.log("GET ONEEEE Company", req.params, companyId);
    try {
      const userFriends = await FriendshipModel.find({
        $or: [{ sender: companyId }, { reciever: companyId }],
        status: 1,
      });
      const friendUserIds = [
        ...new Set(
          userFriends.flatMap((friendship) => [
            friendship.sender,
            friendship.reciever,
          ])
        ),
      ];

      const projects = await ProjectModel.find({
        $and: [
          { companyId: { $ne: companyId } },
          {
            $or: [
              { publicProject: true }, // Fetch public projects
              {
                // Fetch private projects of friends
                publicProject: false,
                companyId: { $in: friendUserIds }, // Check if user is friends with project owner
              },
            ],
          },
        ],
      });
      console.log("PASSWORD : ", userFriends, friendUserIds, "\n", projects);

      res.status(201).json({
        success: true,
        data: { message: "Projects Fetched Successfully", data: projects },
      });
    } catch (error) {
      console.log("Error : ", error);
      res
        .status(400)
        .json({ success: false, error: "Error Fetching Projects" });
    }
  };
}

module.exports = new CompanyController();
