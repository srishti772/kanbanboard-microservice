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

const getTasksByUserId = async (nuid) => {
  try {
    return await TaskModel.find({ owner: nuid });
  } catch (error) {
    throw new Error(error.message);
  }
};


// Add the endpoint
const getTaskSummaryHandler = async () => {
  try {
    const tasks = await TaskModel.aggregate([
      {
        $group: {
          _id: { status: "$status", priority: "$priority" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.status",
          priorities: {
            $push: {
              priority: "$_id.priority",
              count: "$count",
            },
          },
        },
      },
    ]);
    
    const summary = tasks.reduce((acc, task) => {
      if (!acc[task._id]) {
        acc[task._id] = { High: 0, Medium: 0, Low: 0 };
      }
    
      task.priorities.forEach(({ priority, count }) => {
        acc[task._id][priority] = count;
      });
    
      return acc;
    }, {});

    return summary;
    }
       catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getATask,
  updateTask,
  deleteTask,
  getTasksByUserId,
  getTaskSummaryHandler,
};
