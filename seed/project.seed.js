const projectModel = require("../model/project.model");

const seedProjects = async (user) => {
  if (!user) {
    throw new Error("User Not Found");
  }

  const project = await projectModel.create({
    title: "Project Management API",

    description: "Backend project management system",

    status: "in-progress",

    owner: user._id,
  });

  console.log("Project Seed Done", project);
};

module.exports = seedProjects;
