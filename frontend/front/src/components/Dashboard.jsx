import { FaHome, FaUser, FaCog, FaInfoCircle, FaTimes, FaUsers, FaProjectDiagram, FaComments } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      

     <div className='button'></div>
      <button className="sidebar-btn">
        <FaHome /> Home
      </button>
      <button className="sidebar-btn">
        <FaUser /> Profile
      </button>
      <button className="sidebar-btn">
        <FaUsers /> Community
      </button>
      <button className="sidebar-btn">
        <FaProjectDiagram /> Projects
      </button>
      <button className="sidebar-btn">
        <FaComments /> Discussion
      </button>
      <button className="sidebar-btn">
        <FaInfoCircle /> About Us
      </button>
      <button className="sidebar-btn">
        <FaCog /> Settings
      </button>
      
    </div>
  );
}

export default Dashboard;
