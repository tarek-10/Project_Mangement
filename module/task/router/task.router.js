const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  createTaskSchema,
  getSingleTaskSchema,
  getProjectTasksSchema,
  updateTaskSchema,
  filterTasksSchema,
} = require("../joi/task.validation");
const isAuthorized = require("../../../middleware/isAuthorized");
const router = express.Router();
const {
  CREATE_TASKS,
  GET_PROJECT_TASKS,
  UPDATE_TASK,
  FILTER_TASKS,
} = require("../endPoints");

//create task
const createTaskFun = require("../controller/createTasks.controller");
router.post(
  "/api/task/:projectId",
  handleValidation(createTaskSchema),
  isAuthorized(CREATE_TASKS),
  createTaskFun,
);
//end

//get all tasks for specific poject

const getProjectTasksFun = require("../controller/getProjectTasks.controller");
router.get(
  "/api/task/project/:projectId",
  handleValidation(getProjectTasksSchema),
  isAuthorized(GET_PROJECT_TASKS),
  getProjectTasksFun,
);
//end
//Get single task by id
const getSingleTaskFun = require("../controller/getSingleTask.controller");
router.get(
  "/api/task/:id",
  handleValidation(getSingleTaskSchema),
  isAuthorized(GET_PROJECT_TASKS),
  getSingleTaskFun,
);
//end

//update
const updateTaskFun = require("../controller/updateTask.controller");
router.put(
  "/api/task/update/:id",
  handleValidation(updateTaskSchema),
  isAuthorized(UPDATE_TASK),
  updateTaskFun,
);
//end
//FILTER TASKS BY STATUS AND PRIORITY
const filterProjectTasksFun = require("../controller/filterTasks.controller");
router.get(
  "/api/task/filter/:projectId",
  handleValidation(filterTasksSchema),
  isAuthorized(FILTER_TASKS),
  filterProjectTasksFun,
);
//END
module.exports = router;
