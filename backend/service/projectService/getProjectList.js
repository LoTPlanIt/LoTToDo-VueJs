const projectModel = require("../../models/projectModel");
const userModel = require("../../models/userModel");

const getProjectList = async (userId) => {
  try {
    const projects = await projectModel.find({
      members: { $elemMatch: { memberId: userId } },
    });
    return projects;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProjectList;
