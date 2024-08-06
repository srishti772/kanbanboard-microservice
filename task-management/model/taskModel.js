const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Draft", "In Progress", "Completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "Draft",
    },
    owner: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model from the schema
const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
