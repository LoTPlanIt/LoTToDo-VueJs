const express = require("express");
const router = express.Router();

const projectController = require("../controller/projectController");
const taskController = require("../controller/taskController");
const sprintController = require("../controller/sprintController");

const projectBoardCotroller = require("../controller/projectBoardController");

// // project
// router.get("/", projectController.getAllProjects);
// router.get("/:id", projectController.getProjectById);
// router.post("/new", projectController.createProject);

// // task
// router.get("/:id/task_list", taskController.getAllTasks);
// router.get("/:id/task_project_list", taskController.getTaskByProjectId);
// router.post("/:id/task_new", taskController.createTask);

// // sprint
// router.get("/:id/sprint_list", sprintController.getAllSprints);
// router.get("/:id/sprint_project_list", sprintController.getSprintByProjectId);
// router.post("/:id/sprint_new", sprintController.createSprint);

/**
 * Project page journey
 * 1. user select project page -> show project list that user has joined
 * 2. user manage project page
 *    - create new project
 *    - delete project
 *    - edit project
 * 3. user access to project board page -> show project board
 *    - kanban board
 *
 * Kanban Board journey
 * 1. user access to kanban board page -> show kanban board detail
 * 2. user manage task
 *    - create new task
 *    - delete task
 *    - edit task -> the edit task is not the same as edit task in task page
 * 3. user move task to another column -> update task status
 * 4. user access to task -> show task page detail
 */

/**
 * TODO: project route logic
 * [] get project list that user has joined
 * [] create new project
 * [] delete project
 * [block] edit project
 *
 * TODO: kanban board route logic
 * [] get kanban board detail
 * [] create new task
 * [] delete task
 * [block] edit task
 * [] change task status
 *
 * TODO: task page route logic
 * [] get task detail
 * [block] edit task
 *
 */

/* Project */
router.get("/main_project_list", projectBoardCotroller.getProjectListByUserId);
router.post("/main_project_new", projectBoardCotroller.createNewProject);

/* Kanban Board */

module.exports = router;
