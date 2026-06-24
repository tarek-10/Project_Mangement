const { StatusCodes } = require("http-status-codes");
const taskModel = require("../../../model/task.model");
const projectModel = require("../../../model/project.model");

const getProjectTasksFun = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await projectModel.findOne({
      _id: projectId,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }

    const projectTasks = await taskModel.find({
      project: projectId,
      owner: req.user._id,
    });

    res.status(StatusCodes.OK).json({
      message: "success",
      projectTasks,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "error",
      error,
    });
  }
};

module.exports = getProjectTasksFun;
