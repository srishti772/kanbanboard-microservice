const express = require("express");
const TaskController = require("../controller/taskController");

const router = express.Router();

// Define routes for tasks
router.get("/", TaskController.getAllTasks);

router.post("/", TaskController.createTask);

router.get("/summary", TaskController.getTaskSummary);
router.get("/usersummary", TaskController.getUserSummary);

router.get("/:id", TaskController.getATask);
router.get("/user/:nuid", TaskController.getUserTasks);

router.put("/:id", TaskController.updateTask);

router.delete("/:id", TaskController.deleteTask);

module.exports = router;
