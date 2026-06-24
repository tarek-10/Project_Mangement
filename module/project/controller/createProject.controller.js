const { StatusCodes } = require("http-status-codes");
const projectModel = require("../../../model/project.model");
const createProjectFun = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const createProject = await projectModel.create({
      title,
      description,
      status,
      owner: req.user._id,
    });
    res.status(StatusCodes.CREATED).json({ message: "success", createProject });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
module.exports = createProjectFun;
