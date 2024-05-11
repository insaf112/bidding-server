const FileModel = require("../models/FileModel");
const ProjectModel = require("../models/ProjectModel");

class ProjectController {
  PostProject = async (req, res) => {
    console.log("PROJECTTTTTTT : ", req.body);
    const { userId } = req.body;
    req.files = req.files.map((file) => ({
      ...file,
      userId,
    }));

    console.log("FILESSSSSSSSS : ", req.files);
    try {
      const resFiles = await FileModel.insertMany(req.files, {
        rawResult: true,
      });
      const insertedIdsArray = Object.values(resFiles.insertedIds).map((id) =>
        id.toString()
      );
      const project = await ProjectModel.create({
        ...req.body,
        files: insertedIdsArray,
      });
      console.log("FILESSSSSSSSS : ", project, insertedIdsArray);

      res.status(201).json({
        success: true,
        data: { message: "Project Posted Successfully", data: project },
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
