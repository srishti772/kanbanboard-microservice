const TaskModel = require("../model/taskModel");
const { publishToExchange } = require("../rabbitMQ/publisher");

const createTask = async (data) => {
  try {
    const taskNew = await TaskModel.create(data.task);
    const taskDetails = {
      action:'created',
      task: taskNew,
      owner: data.owner,
    };
    publishToExchange(
      "task_exchange",
      "created",
      JSON.stringify(taskDetails)
    );
    return taskNew;
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

const updateTask = async (id, data) => {
  try {
    let updatedTask;
    let taskDetails;

    if (data.task) {
      updatedTask = await TaskModel.findByIdAndUpdate(id, data.task, {
        new: true,
        runValidators: true,
      });

      taskDetails = {
        action:'updated',
        task: updatedTask,
        owner: data.owner,
      };

      publishToExchange(
        "task_exchange",
        "updated",
        JSON.stringify(taskDetails)
      );
    } else {
      updatedTask = await TaskModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    }

    return updatedTask;
  } catch (error) {
    // Directly rethrow the caught error
    throw error;
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserSummary = async () => {
  try {
    const tasks = await TaskModel.aggregate([
      {
        $group: {
          _id: { owner: "$owner", status: "$status", priority: "$priority" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { owner: "$_id.owner", status: "$_id.status" },
          priorities: {
            $push: {
              k: "$_id.priority",
              v: "$count",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.owner",
          status: {
            $push: {
              k: "$_id.status",
              v: {
                $arrayToObject: "$priorities",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          owner: "$_id",
          status: {
            $arrayToObject: "$status",
          },
        },
      },
    ]);

    // Format the output
    const summary = {};
    tasks.forEach((task) => {
      summary[task.owner] = task.status;
    });

    return summary;
  } catch (error) {
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
  getUserSummary,
};
