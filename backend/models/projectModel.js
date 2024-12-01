const mongoose = require("mongoose");

const projectschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["planning", "inprogress", "done", "paused", "cancelled"],
      default: "planning",
    },
    githubUrl: String,
    members: [
      {
        memberId: {
          type: Schema.Types.ObjectId,
          ref: "userData",
        },
        role: {
          type: String,
          enum: ["admin", "member", "guest"],
          default: "guest",
        },
        status: {
          type: String,
          enum: ["invited", "joined", "left"],
          default: "invited",
        },
      },
    ],
    taskStatusList: [
      {
        status: String,
        color: String,
      },
    ],
    taskLabelList: [
      {
        label: String,
        color: String,
      },
    ],
    taskList: [{ type: Schema.Types.ObjectId, ref: "taskData" }],
    sprintList: [{ type: Schema.Types.ObjectId, ref: "sprintData" }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "userData",
    },
  },
  {
    timestamps: true,
  }
);

/* Middleware */
projectschema.pre("remove", async function (next) {
  await mongoose.model("sprintData").deleteMany({ projectId: this._id });
  await mongoose.model("taskData").deleteMany({ projectId: this._id });
  next();
});

const projectModel = mongoose.model(
  "projectData",
  projectschema,
  "projectData"
);

module.exports = projectModel;
