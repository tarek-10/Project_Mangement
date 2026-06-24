const { StatusCodes } = require("http-status-codes");
const taskModel = require("../../../model/task.model");
const projectModel = require("../../../model/project.model");
const createTaskFun = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    const project = await projectModel.findOne({
      _id: projectId,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }
    const task = await taskModel.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project: projectId,
      owner: req.user._id,
    });
    res.status(StatusCodes.CREATED).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
module.exports = createTaskFun;
