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
      name: "Tarek Mohamed",
      email: "tarek@test.com",
      password: "tarek@123",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  userModel.findOne.mockResolvedValue(null);
  jwt.sign.mockReturnValue("fake_string_token");
  sendEmail.mockResolvedValue(true);
  bcrypt.hash.mockImplementation((password, salt, callback) => {
    callback(null, "hashed_password");
  });

  userModel.insertMany.mockResolvedValue({
    name: "Tarek Mohamed",
    email: "tarek@test.com",
    password: "hashed_password",
  });
  await userSignUpFun(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    message: "success",
    registerUser: {
      name: "Tarek Mohamed",
      email: "tarek@test.com",
      password: "hashed_password",
    },
  });
  expect(userModel.findOne).toHaveBeenCalledWith({
    email: "tarek@test.com",
  });
  expect(jwt.sign).toHaveBeenCalledWith(
    { email: "tarek@test.com" },
    process.env.PRIVATE_KEY,
  );
  expect(sendEmail).toHaveBeenCalledWith("tarek@test.com", expect.any(String));
  expect(bcrypt.hash).toHaveBeenCalledWith(
    "tarek@123",
    10,
    expect.any(Function),
  );
  expect(userModel.insertMany).toHaveBeenCalledWith({
    name: "Tarek Mohamed",
    email: "tarek@test.com",
    password: "hashed_password",
  });
});
