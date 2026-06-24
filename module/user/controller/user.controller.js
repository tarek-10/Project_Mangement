const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../../../middleware/sendEmail");
const userSignUpFun = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      const message = `<a href ='http://localhost:3000/verify/${token}'>verify your mail</a>`;
      await sendEmail(email, message);
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) throw err;
        const registerUser = await userModel.insertMany({
          name,
          email,
          password: hash,
        });
        res
          .status(StatusCodes.CREATED)
          .json({ message: "success", registerUser });
      });
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User Is Already Exist..!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};
module.exports = userSignUpFun;
