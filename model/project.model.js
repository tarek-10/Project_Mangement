const mongoose = require("mongoose");
const projectSchema = require("../schema/project.schema");
const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;
