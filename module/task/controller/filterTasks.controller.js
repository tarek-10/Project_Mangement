const { StatusCodes } = require("http-status-codes");
const taskModel = require("../../../model/task.model");
const projectModel = require("../../../model/project.model");

const filterProjectTasksFun = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, priority } = req.query;

    // check project belongs to user
    const project = await projectModel.findOne({
      _id: projectId,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }
    const filter = {
      project: projectId,
      owner: req.user._id,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await taskModel.find(filter);

    if (tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No Tasks Found",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "success",
      tasks,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "error",
      error,
    });
  }
};

module.exports = filterProjectTasksFun;
