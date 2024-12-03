const projectModel = require("../../models/projectModel");

const createProject = async (newProjectData) => {
  try {
    //TODO - implement validation
    const newProject = new projectModel(newProjectData);
    return await newProject.save();
  } catch (error) {
    throw error;
  }
};

module.exports = createProject;
