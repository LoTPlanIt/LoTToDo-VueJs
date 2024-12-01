const mongoose = require("mongoose");

const sprintschema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projectData",
    },
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["current", "upcoming", "past"],
      default: "upcoming",
    },
    taskList: [
      {
        type: Schema.Types.ObjectId,
        ref: "taskData",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const sprintModel = mongoose.model("sprintData", sprintschema, "sprintData");

module.exports = sprintModel;
