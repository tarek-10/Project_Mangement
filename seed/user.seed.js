const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const existingUser = await userModel.findOne({
    email: "test@test.com",
  });
  if (existingUser) {
    return existingUser;
  }
  const user = await userModel.create({
    name: "Test User",
    email: "test@test.com",
    password: hashedPassword,
    isConfirmed: true,
  });

  console.log("User Seed Done");
  return user;
};

module.exports = seedUsers;
