import { useState } from "react";
import {
  FaBell,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaTimes,
  FaUsers,
  FaProjectDiagram,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const styles = {
  topControls: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 20px",
    background: "#f4f4f4",
    borderBottom: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
  },
  dashboardIcon: {
    fontSize: "20px",
    padding: "10px 12px",
    background: "#274C77",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.3s",
  },
  iconBtn: {
    background: "#274C77",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    transition: "background 0.3s",
    marginLeft: "auto",
  },
  createBtn: {
    background: "#274C77",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    transition: "background 0.3s",
  },
  logoutBtn: {
    background: "#274C77",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    transition: "background 0.3s",
  },
};

// Sidebar component
function Dashboard({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className={`sidebar${isOpen ? " open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/homepage")}>
        <FaHome /> Home
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/profile")}>
        <FaUser /> Profile
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/community")}>
        <FaUsers /> Community
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/project")}>
        <FaProjectDiagram /> Projects
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/discussion")}>
        <FaComments /> Discussion
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/about")}>
        <FaInfoCircle /> About Us
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation("/settings")}>
        <FaCog /> Settings
      </button>
    </div>
  );
}


// Top navbar component
export default function TopNavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <>
      <div style={styles.topControls}>
        <button style={styles.dashboardIcon} onClick={handleSidebarToggle}>
          <FaBars />
        </button>
        <button style={styles.iconBtn}>
          <FaBell />
        </button>
        <button style={styles.createBtn}>
          <FaPlus /> Create Community
        </button>
        <button style={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
      <Dashboard isOpen={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}