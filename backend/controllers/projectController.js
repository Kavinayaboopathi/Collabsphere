// controllers/projectController.js
const Project = require("../models/projectModel");

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};
    if (filters.domain) query.domain = filters.domain;
    if (filters.dept) query.dept = filters.dept;
    if (filters.owner) query.owner = filters.owner;

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

exports.getProjectsByUser = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;

  try {
    let projects;

    if (type === "mine") {
      projects = await Project.find({ ownerId: userId });
    } else if (type === "others") {
      projects = await Project.find({ ownerId: { $ne: userId } });
    } else {
      return res.status(400).json({ error: "Invalid type parameter" });
    }

    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching user projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};
