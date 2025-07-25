const Project = require("../models/Project");

exports.createProject = async (projectData) => {
  const newProject = new Project(projectData);
  return await newProject.save();
};

exports.getFilteredProjects = async (filters) => {
  const query = {};
  if (filters.domain) query.domain = filters.domain;
  if (filters.dept) query.dept = filters.dept;
  if (filters.owner) query.owner = filters.owner;

  return await Project.find(query).sort({ createdAt: -1 });
};
