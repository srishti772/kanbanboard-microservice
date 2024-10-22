const TaskService = require("../service/taskService");
const mongoose = require("mongoose");

// Helper function to validate ObjectId
const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ID format`);
    error.statusCode = 400;
    throw error;
  }
};

// Helper function to get and validate a task
const findTaskOrThrow = async (id) => {
  validateObjectId(id);
  const task = await TaskService.getATask(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    const task = await TaskService.createTask(newTask);
    res.status(201).json({ data: task });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

const getATask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await findTaskOrThrow(id);
    res.status(200).json(task);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await findTaskOrThrow(id); // Check if task exists; throws 404 if not
    await TaskService.deleteTask(id); // Perform deletion
    res.status(204).send(); // Send no content response
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await findTaskOrThrow(id); // Validate ID and ensure the task exists

    const task = await TaskService.updateTask(id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

const getUserTasks = async (req, res, next) => {
  try {
    const userTasks = await TaskService.getTasksByUserId(req.params.nuid);
    res.status(200).json(userTasks);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

const getTaskSummary = async (req, res, next) => {
  try {
    const tasksSummary = await TaskService.getTaskSummaryHandler();
    res.status(200).json(tasksSummary);
  } catch (error) {
    next(error);
  }
};

const getUserSummary = async (req, res, next) => {
  try {
    const userSummary = await TaskService.getUserSummary();
    res.status(200).json(userSummary);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getATask,
  updateTask,
  deleteTask,
  getUserTasks,
  getTaskSummary,
  getUserSummary,
};
