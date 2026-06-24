const express = require("express");
const connectionDB = require("./config/db");
const {
  userRouter,
  projectRouter,
  taskRouter,
} = require("./router/app.router");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
connectionDB();
app.use(userRouter, projectRouter, taskRouter);
app.listen(port, () => {
  console.log(`Server Is Running on port ${port}`);
});
