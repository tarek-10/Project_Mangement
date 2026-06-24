const express = require("express");
const isAuthorized = require("../../../middleware/isAuthorized");
const {
  CREATE_PROJECT,
  GET_USER_PROJECTS,
  GET_SINGLE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} = require("../endPoints");
const handleValidation = require("../../../middleware/handleValidation");
const {
  createProjectSchema,
  getSingleProjectByIdSchema,
  updateProjectSchema,
  deleteProjectSchema,
} = require("../joi/project.validation");
const router = express.Router();

//create project
const createProjectFun = require("../controller/createProject.controller");
router.post(
  "/create/project",
  handleValidation(createProjectSchema),
  isAuthorized(CREATE_PROJECT),
  createProjectFun,
);
//end

//Get all projects for authenticated user
const getUserProjectsFun = require("../controller/getUserProjects.controller");
router.get(
  "/get/projects",
  isAuthorized(GET_USER_PROJECTS),
  getUserProjectsFun,
);
//end

// Get single project by ID
const getSingleProjectFun = require("../controller/getSingleProject.controller");
router.get(
  "/api/project/:id",
  handleValidation(getSingleProjectByIdSchema),
  isAuthorized(GET_SINGLE_PROJECT),
  getSingleProjectFun,
);
//end

//update projects
const updateProjectFun = require("../controller/updateProject.controller");
router.put(
  "/api/project/update/:id",
  handleValidation(updateProjectSchema),
  isAuthorized(UPDATE_PROJECT),
  updateProjectFun,
);
//end
//delete
const deleteProjectFun = require("../controller/deleteProject.controller");
router.delete(
  "/api/project/delete/:id",
  handleValidation(deleteProjectSchema),
  isAuthorized(DELETE_PROJECT),
  deleteProjectFun,
);
//end
module.exports = router;
