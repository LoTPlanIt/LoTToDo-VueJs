const express = require("express");
const router = express.Router();

const projectController = require("../controller/projectController");
const taskController = require("../controller/taskController");
const sprintController = require("../controller/sprintController");

// project
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post("/new", projectController.createProject);

// task
router.get("/:id/task_list", taskController.getAllTasks);
router.get("/:id/task_project_list", taskController.getTaskByProjectId);
router.post("/:id/task_new", taskController.createTask);

// sprint
router.get("/:id/sprint_list", sprintController.getAllSprints);
router.get("/:id/sprint_project_list", sprintController.getSprintByProjectId);
router.post("/:id/sprint_new", sprintController.createSprint);

module.exports = router;
