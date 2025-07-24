import { FaHome, FaUser, FaCog, FaInfoCircle, FaTimes } from 'react-icons/fa'
import './Dashboard.css'

function Dashboard({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>

      {/* Menu Items */}
      <button className="sidebar-btn">
        <FaHome /> Home
      </button>
      <button className="sidebar-btn">
        <FaUser /> Profile
      </button>
      <button className="sidebar-btn">
        <FaCog /> Settings
      </button>
      <button className="sidebar-btn">
        <FaInfoCircle /> About Us
      </button>
    </div>
  )
}

export default Dashboard
