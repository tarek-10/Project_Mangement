const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userLoginFun = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "You Should Register First..!" });
    } else {
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.PRIVATE_KEY,
      );
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        res.status(StatusCodes.OK).json({
          message: "sucess",
          token,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        res.json({
          message: "In-Valid password...!",
        });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
module.exports = userLoginFun;
