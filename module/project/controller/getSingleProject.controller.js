const { StatusCodes } = require("http-status-codes");
const projectModel = require("../../../model/project.model");
const getSingleProjectFun = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }
    res.status(StatusCodes.OK).json({ message: "success", project });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
module.exports = getSingleProjectFun;
