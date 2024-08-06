const TaskModel = require("../model/taskModel");

const createTask = async (task) => {
  try {
    return await TaskModel.create(task);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllTasks = async () => {
  try {
    return await TaskModel.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getATask = async (id) => {
  try {
    return await TaskModel.findOne({ _id: id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = async (id, task) => {
  try {
    return await TaskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    return await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTasksByUserId = async (nuid) =>{
  try{
    return await TaskModel.find({owner: nuid});
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createTask, getAllTasks, getATask, updateTask, deleteTask, getTasksByUserId };
