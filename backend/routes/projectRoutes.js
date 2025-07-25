const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// POST - Add a new project
router.post("/add", async (req, res) => {
  const { title, description, domain, dept, owner, ownerName } = req.body;
  if (!title || !description || !owner) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newProject = new Project({ title, description, domain, dept, owner, ownerName });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET - All or filtered projects
router.get("/", async (req, res) => {
  const { domain, dept, owner } = req.query;
  const filter = {};
  if (domain) filter.domain = domain;
  if (dept) filter.dept = dept;
  if (owner) filter.owner = owner;

  try {
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err });
  }
});

module.exports = router;
