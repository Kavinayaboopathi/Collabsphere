const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  domain: String,
  dept: String,
  owner: String,     // e.g., userId from sessionStorage
  ownerName: String, // Optional: to store display name
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
