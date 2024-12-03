const userModel = require("../../models/userModel");

const addProjectToUserJoinedList = async (userId, projectId) => {
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.joinedProjectList.includes(projectId)) {
      throw new Error("User already joined this project");
    }
    user.joinedProjectList.push(projectId);
    await user.save();
    return user.joinedProjectList;
  } catch (error) {
    throw error;
  }
};

//TODO - remove project from user joined list

module.exports = { addProjectToUserJoinedList };
