import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "../styles/project.css";
import Dashboard from "../components/Dashboard";

export default function Project() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [selectedProjectStudents, setSelectedProjectStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const students = [
    { id: 1, name: "Alice", dept: "CSE", year: 3, skills: "React, NLP", project: "AI Chatbot" },
    { id: 2, name: "Charlie", dept: "CSE", year: 2, skills: "Python, ML", project: "AI Chatbot" },
    { id: 3, name: "Bob", dept: "ECE", year: 4, skills: "IoT, Sensors", project: "IoT Smart Home" },
  ];

  const handleViewProfile = (projectTitle) => {
    const related = students.filter((s) => s.project === projectTitle);
    setSelectedProjectStudents(related);
    setShowStudentModal(true);
  };

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Chatbot",
      description: "An AI-powered chatbot built using NLP for customer support.",
      domain: "AI",
      dept: "CSE",
      owner: "You",
    },
    {
      id: 2,
      title: "IoT Smart Home",
      description: "IoT-based automation for home lighting and temperature control.",
      domain: "IoT",
      dept: "ECE",
      owner: "Bob Smith",
    },
  ]);

  const [showMyProjects, setShowMyProjects] = useState(false);
  const [filters, setFilters] = useState({ domain: "", dept: "" });
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    domain: "",
    dept: "",
  });

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return;
    const newEntry = { ...newProject, id: projects.length + 1, owner: "You" };
    setProjects([newEntry, ...projects]);
    setNewProject({ title: "", description: "", domain: "", dept: "" });
    setShowModal(false);
  };

  const filteredProjects = projects.filter(
    (p) =>
      (!filters.domain || p.domain === filters.domain) &&
      (!filters.dept || p.dept === filters.dept) &&
      (showMyProjects ? p.owner === "You" : true)
  );

  return (
    <div className="project-page">
      {/* Sidebar */}
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button className="dashboard-icon" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Header with Toggle and Add Project */}
      <div className="project-header">
        <div className="toggle-bar">
          <button
            className={!showMyProjects ? "active" : ""}
            onClick={() => setShowMyProjects(false)}
          >
            Others' Projects
          </button>
          <button
            className={showMyProjects ? "active" : ""}
            onClick={() => setShowMyProjects(true)}
          >
            My Projects
          </button>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="project-filters">
        <select onChange={(e) => setFilters({ ...filters, domain: e.target.value })}>
          <option value="">Filter by Domain</option>
          <option value="AI">AI</option>
          <option value="IoT">IoT</option>
          <option value="Web">Web</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, dept: e.target.value })}>
          <option value="">Filter by Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
        </select>
      </div>

      {/* Project Cards */}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <h3>{p.title}</h3>
              <p>{p.description.slice(0, 100)}...</p>
              <p className="meta">
                <strong>Domain:</strong> {p.domain} | <strong>Dept:</strong> {p.dept}
              </p>
              <div className="card-actions">
                <button className="profile-btn" onClick={() => handleViewProfile(p.title)}>
                  View Profile
                </button>
                <button className="details-btn">Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects found</p>
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <select
              value={newProject.domain}
              onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
            >
              <option value="">Select Domain</option>
              <option value="AI">AI</option>
              <option value="IoT">IoT</option>
              <option value="Web">Web</option>
            </select>
            <select
              value={newProject.dept}
              onChange={(e) => setNewProject({ ...newProject, dept: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddProject}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Students in this Project</h2>
            <div className="student-list">
              {selectedProjectStudents.map((student) => (
                <div key={student.id} className="student-card">
                  <img
                    src="https://via.placeholder.com/80"
                    alt={student.name}
                    className="student-image"
                  />
                  <div className="student-details">
                    <h4>{student.name}</h4>
                    <p>{student.dept} - Year {student.year}</p>
                    <p><strong>Skills:</strong> {student.skills}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowStudentModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
