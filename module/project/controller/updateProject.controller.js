const { StatusCodes } = require("http-status-codes");
const projectModel = require("../../../model/project.model");
const updateProjectFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedProject = await projectModel.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { $set: body },
      { new: true },
    );
    if (!updatedProject) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }
    res.status(StatusCodes.OK).json({ message: "success", updatedProject });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = updateProjectFun;
