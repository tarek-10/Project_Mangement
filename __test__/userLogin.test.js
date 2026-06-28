jest.mock("../model/user.model");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
const userLoginFun = require("../module/user/controller/userLogin.controller");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
beforeEach(() => {
  jest.clearAllMocks();
});

test("Login Successfully", async () => {
  const req = {
    body: {
      email: "tarek@test.com",
      password: "tarek@123",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  userModel.findOne.mockResolvedValue({
    _id: "1",
    name: "Tarek Mohamed",
    email: "tarek@test.com",
    password: "hashed_password",
    role: "user",
  });
  jwt.sign.mockReturnValue("fake_token_string");
  bcrypt.compare.mockResolvedValue(true);
  await userLoginFun(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "success",
    token: "fake_token_string",
    data: {
      _id: "1",
      name: "Tarek Mohamed",
      email: "tarek@test.com",
    },
  });
  expect(userModel.findOne).toHaveBeenCalledWith({
    email: "tarek@test.com",
  });
  expect(jwt.sign).toHaveBeenCalledWith(
    { _id: "1", email: "tarek@test.com", role: "user" },
    process.env.PRIVATE_KEY,
  );
  expect(bcrypt.compare).toHaveBeenCalledWith("tarek@123", "hashed_password");
});
