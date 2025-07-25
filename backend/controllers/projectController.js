const Project = require('../models/projectModel');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: "Error creating project", error: err.message });
  }
};

// Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};

// Get Projects for a Specific User
exports.getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query; // "mine" or "others"

    let query = {};

    if (type === "mine") {
      query.ownerId = userId;
    } else if (type === "others") {
      query.ownerId = { $ne: userId };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user projects", error: err.message });
  }
};
