const ProjectModel = require("../models/ProjectModel");

class ProjectController {
  PostProject = async (req, res) => {
    console.log("Project", req.body);
    try {
      await ProjectModel.create({ ...req.body });
      res.status(201).json({
        success: true,
        data: { message: "Project Posted Successfully", data: null },
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).json({ success: false, error: "Error Posting Project" });
    }
  };
  GetProject = async (req, res) => {
    const { id } = req.params;
    console.log("Project", req.body, id);
    try {
      const project = await ProjectModel.findById(id);
      res.status(201).json({
        success: true,
        data: { message: "Project Fetch Successfully", data: project },
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(400).json({ success: false, error: "Error Fetching Project" });
    }
  };
}
module.exports = new ProjectController();
