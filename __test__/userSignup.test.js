jest.mock("../model/user.model");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../middleware/sendEmail");

const userModel = require("../model/user.model");
const userSignUpFun = require("../module/user/controller/user.controller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../middleware/sendEmail");

test("user signup success", async () => {
  const req = {
    body: {
      name: "Tarek",
      email: "tarek@test.com",
      password: "123456",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  userModel.findOne.mockResolvedValue(null);

  jwt.sign.mockReturnValue("my_fake_token_string");

  sendEmail.mockResolvedValue(true);

  bcrypt.hash.mockImplementation((password, salt, callback) => {
    callback(null, "hashed-password");
  });

  userModel.insertMany.mockResolvedValue({
    name: "Tarek",
    email: "tarek@test.com",
    password: "hashed-password",
  });

  await userSignUpFun(req, res);
  expect(res.status).toHaveBeenCalledWith(201);

  expect(res.json).toHaveBeenCalledWith({
    message: "success",
    registerUser: {
      name: "Tarek",
      email: "tarek@test.com",
      password: "hashed-password",
    },
  });

  expect(userModel.findOne).toHaveBeenCalledWith({
    email: "tarek@test.com",
  });

  expect(jwt.sign).toHaveBeenCalled();

  expect(sendEmail).toHaveBeenCalled();

  expect(bcrypt.hash).toHaveBeenCalled();

  expect(userModel.insertMany).toHaveBeenCalled();
});
