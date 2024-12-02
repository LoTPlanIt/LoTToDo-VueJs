const projectService = require("../service/projectService");

const getProjectListByUserId = async (req, res) => {
  try {
    const userId = req.userData._id;
    const projectList = await projectService.getProjectListByUserId(userId);
    const projectCount = projectList.length;

    return res.status(200).json({
      data: projectList,
      count: projectCount,
    });
    
  } catch (error) {
    return res.status(500).json({ error: "Cannot get project list" });
  }
};

const projectBoardCotroller = {
  getProjectListByUserId,
};

module.exports = projectBoardCotroller;
