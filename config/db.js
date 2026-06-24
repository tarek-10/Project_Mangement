const mongoose = require("mongoose");

const connectionDB = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
      console.log("Successfully To Connected DB ...!");
    })
    .catch((error) => {
      console.log("Fail To Connect DataBase", error.message);
    });
};

module.exports = connectionDB;
