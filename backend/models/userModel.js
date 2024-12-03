const mongoose = require("mongoose");

const userschema = new Schema(
  {
    user_id: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    gmail: { type: String, unique: true, require: true },
    profile: {
      tel: { type: String },
      birth: { type: Date },
      age: { type: String },
      sex: { type: String },
      image: { type: String },
    },
    joinedProjectList: [{ type: Schema.Types.ObjectId, ref: "projectData" }],
    assignedTaskList: [{ type: Schema.Types.ObjectId, ref: "taskData" }],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userData", userschema, "userData");

module.exports = userModel;
