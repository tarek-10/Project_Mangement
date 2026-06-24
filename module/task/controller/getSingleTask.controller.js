const { StatusCodes } = require("http-status-codes");
const taskModel = require("../../../model/task.model");
const getSingleTaskFun = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel
      .findOne({
        _id: id,
        owner: req.user._id,
      })
      .populate("project");
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task Not Found",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "success",
      task,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
module.exports = getSingleTaskFun;
