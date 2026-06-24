const { StatusCodes } = require("http-status-codes");
const taskModel = require("../../../model/task.model");
const updateTaskFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedTask = await taskModel.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      {
        $set: body,
      },
      {
        new: true,
      },
    );

    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task Not Found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Task Updated Successfully",
      updatedTask,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};

module.exports = updateTaskFun;
