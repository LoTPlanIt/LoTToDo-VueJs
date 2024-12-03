const projectModel = require("../../models/projectModel");
const userModel = require("../../models/userModel");

const getByUserId = async (userId) => {
  try {
    const projectUserHasJoinedList = await userModel
      .find({ _id: userId })
      .populate("joinedProjectList")
      .exec();

    const projects = await projectModel.find({
      members: { $elemMatch: { memberId: userId } },
    });
    return projectUserHasJoinedList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getByUserId };
