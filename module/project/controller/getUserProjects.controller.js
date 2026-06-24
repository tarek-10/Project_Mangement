const { StatusCodes } = require("http-status-codes");
const projectModel = require("../../../model/project.model");
const getUserProjectsFun = async (req, res) => {
  try {
    const projects = await projectModel.find({
      owner: req.user._id,
    });
    res.status(StatusCodes.OK).json({ message: "success", projects });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = getUserProjectsFun;
