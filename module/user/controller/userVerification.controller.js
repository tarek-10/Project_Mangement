const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const userVerifyFun = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const decodedEmail = decoded.email;
    const user = await userModel.findOne({ email: decodedEmail });
    if (user) {
      if (user.isConfirmed === true) {
        res
          .status(StatusCodes.CONFLICT)
          .json({ message: "User Is Already Confirmed..!" });
      } else {
        const verifiedUser = await userModel.findOneAndUpdate(
          { _id: user._id },
          { isConfirmed: true },
          { new: true },
        );
        res
          .status(StatusCodes.OK)
          .json({ message: "User Is Verify Successfully..!", verifiedUser });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "You Should Register First..!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};
module.exports = userVerifyFun;
