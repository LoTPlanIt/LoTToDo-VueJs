const projectService = require("../service/projectService");
const userService = require("../service/userService");
const TokenData = require("../dto/tokenDataDto");

const getProjectListByUserId = async (req, res) => {
  try {
    const { userId } = new TokenData(req);
    const projectList = await projectService.getProjectList.getByUserId(userId);
    const projectCount = projectList.length;

    return res.status(200).json({
      data: projectList,
      count: projectCount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot get project list", error: error });
  }
};

const createNewProject = async (req, res) => {
  try {
    const { userId } = new TokenData(req);

    const newProjectData = {
      ...req.body,
      owner: userId,
      members: [{ memberId: userId, role: "admin", status: "joined" }],
    };

    const newProject = await projectService.createProject(newProjectData);
    const newJoinedList =
      await userService.joinProject.addProjectToUserJoinedList(
        userId,
        newProject._id
      );

    //TODO - remove project if add project to user joined list failed

    return res.status(200).json({
      data: {
        newProjectId: newProject._id,
        joinedProjectList: newJoinedList,
      },
      message: "Create new project successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot create new project", error: error });
  }
};

const projectBoardCotroller = {
  getProjectListByUserId,
  createNewProject,
};

module.exports = projectBoardCotroller;
