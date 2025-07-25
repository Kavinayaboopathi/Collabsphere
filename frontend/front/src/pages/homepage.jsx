import { useState } from "react";
import { FaBell, FaPlus, FaBars, FaSignOutAlt, FaSearch } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import "../styles/homepage.css";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    skills: "",
    domain: "",
    tech: "",
    projects: ""
  });
  const [students] = useState([
    { id: 1, name: "Alice Johnson", department: "CSE", year: "3", skills: "React, Node.js", projects: 2 },
    { id: 2, name: "Bob Smith", department: "ECE", year: "2", skills: "Python, AI", projects: 1 },
    { id: 3, name: "Carol Davis", department: "CSE", year: "4", skills: "AI, ML", projects: 4 }
  ]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selected, setSelected] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const result = students.filter((s) => {
      return (
        (!filters.department || s.department === filters.department) &&
        (!filters.year || s.year === filters.year) &&
        (!filters.skills || s.skills.toLowerCase().includes(filters.skills.toLowerCase())) &&
        (!filters.domain || s.skills.toLowerCase().includes(filters.domain.toLowerCase())) &&
        (!filters.tech || s.skills.toLowerCase().includes(filters.tech.toLowerCase())) &&
        (!filters.projects || s.projects.toString() === filters.projects) &&
        (!search || s.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    setFilteredStudents(result);
  };

  const displayList = filteredStudents.length > 0 ? filteredStudents : students;

  return (
    <div className="homepage">
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top Row */}
      <div className="top-controls">
        <button className="dashboard-icon" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <button className="icon-btn">
          <FaBell />
        </button>
        <button className="create-btn">
          <FaPlus /> Create Community
        </button>
        <button className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Search and Filters */}
      <div className="search-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search students or projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          <select name="department" onChange={handleFilterChange}>
            <option value="">Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
          <select name="year" onChange={handleFilterChange}>
            <option value="">Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <select name="skills" onChange={handleFilterChange}>
            <option value="">Skills</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="AI">AI</option>
          </select>
          <select name="domain" onChange={handleFilterChange}>
            <option value="">Domain</option>
            <option value="AI">AI</option>
            <option value="Web">Web</option>
          </select>
          <select name="tech" onChange={handleFilterChange}>
            <option value="">Technology</option>
            <option value="Node.js">Node.js</option>
            <option value="ML">ML</option>
          </select>
          <select name="projects" onChange={handleFilterChange}>
            <option value="">No. of Projects</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="student-list">
        <h2>{filteredStudents.length > 0 ? "Filtered Students" : "All Students"}</h2>

        {selected.length > 0 && (
          <button className="send-btn">
            Send Request ({selected.length})
          </button>
        )}

        {filteredStudents.length > 0 ? (
          // Horizontal Cards for Filtered Results
          <div className="student-horizontal-cards">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-h-card">
                <img
                  src="https://via.placeholder.com/80"
                  alt={student.name}
                  className="student-avatar"
                />
                <div className="student-info">
                  <h4>{student.name}</h4>
                  <p>{student.department} - Year {student.year}</p>
                  <p><strong>Skills:</strong> {student.skills}</p>
                  <p><strong>Projects:</strong> {student.projects}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selected.includes(student.id)}
                  onChange={() => toggleSelect(student.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          // Vertical Grid for All Students (default)
          <div className="student-grid">
            {displayList.map((student) => (
              <div key={student.id} className="student-card">
                <img
                  src="https://via.placeholder.com/100"
                  alt={student.name}
                  className="student-image"
                />
                <h4>{student.name}</h4>
                <p>{student.department} - Year {student.year}</p>
                <p><strong>Skills:</strong> {student.skills}</p>
                <p><strong>Projects:</strong> {student.projects}</p>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}