require("dotenv").config();

const connectionDB = require("../config/db");
const seedUsers = require("./user.seed");
const seedProjects = require("./project.seed");

const runSeed = async () => {
  try {
    await connectionDB();

    const user = await seedUsers();

    await seedProjects(user);

    console.log("Database Seed Completed Successfully");

    process.exit(0);
  } catch (error) {
    console.log("Seed Error", error);

    process.exit(1);
  }
};

runSeed();
