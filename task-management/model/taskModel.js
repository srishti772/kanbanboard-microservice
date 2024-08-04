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
      type: [String],
      validate: {
        validator: function (arr) {
            if (arr === undefined ||  arr.length===0) {
                return true;
              }
              return arr.length === 2;
        },
        message: "Owner array must contain exactly two elements: [nuid, name]",
      },
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
