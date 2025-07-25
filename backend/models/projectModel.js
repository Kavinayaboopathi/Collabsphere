const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    domain: String,
    dept: String,
    ownerId: String,         // matches frontend sessionStorage userId
    ownerName: String,       // optional, for display
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
