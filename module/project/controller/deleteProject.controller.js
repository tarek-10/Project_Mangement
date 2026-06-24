const { StatusCodes } = require("http-status-codes");
const projectModel = require("../../../model/project.model");
const deleteProjectFun = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectModel.findByIdAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!deletedProject) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project Not Found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Project Deleted Successfully",

      deletedProject,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = deleteProjectFun;
