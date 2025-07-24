import { FaHome, FaUser, FaCog, FaInfoCircle, FaUsers, FaProjectDiagram, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ isOpen, onClose }) {
  const navigate = useNavigate(); // For navigation

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close sidebar after navigation (optional)
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-btn" onClick={() => handleNavigation('/homepage')}>
        <FaHome /> Home
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/profile')}>
        <FaUser /> Profile
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/community')}>
        <FaUsers /> Community
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/projects')}>
        <FaProjectDiagram /> Projects
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/discussion')}>
        <FaComments /> Discussion
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/about')}>
        <FaInfoCircle /> About Us
      </button>
      <button className="sidebar-btn" onClick={() => handleNavigation('/settings')}>
        <FaCog /> Settings
      </button>
    </div>
  );
}

export default Dashboard;
