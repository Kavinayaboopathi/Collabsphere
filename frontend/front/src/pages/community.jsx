import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/community.css";
import Dashboard from "../components/Dashboard";

export default function Community() {
  const navigate = useNavigate();

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [filters, setFilters] = useState({ date: "", month: "", name: "" });
  const [search, setSearch] = useState("");

  const [communities] = useState([
    { id: 1, name: "AI Chatbot Project", date: "2025-07-15", lastMsg: "Meeting at 5 PM" },
    { id: 2, name: "Web App Development", date: "2025-07-10", lastMsg: "Code pushed to GitHub" },
    { id: 3, name: "IoT Smart Home", date: "2025-06-28", lastMsg: "Testing sensors tomorrow" },
  ]);

  const filteredCommunities = communities.filter((c) => {
    const communityMonth = new Date(c.date).toLocaleString("default", { month: "long" });
    return (
      (!filters.date || c.date === filters.date) &&
      (!filters.month || communityMonth.toLowerCase().includes(filters.month.toLowerCase())) &&
      (!filters.name || c.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="community-page">
      {/* Sidebar */}
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button className="dashboard-icon" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Search & Filter Section */}
      <div className="community-filters">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <input
          type="date"
          name="date"
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <select name="month" onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
          <option value="">Month</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
        </select>
        <input
          type="text"
          placeholder="Project name..."
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
      </div>

      {/* Community List */}
      <div className="community-list">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((c) => (
            <div
              key={c.id}
              className="community-item"
              //onClick={() => navigate(`/chat/${c.id}`)}
              onClick={() => navigate(`/chat`)}
            >
              <div className="community-avatar">{c.name.charAt(0)}</div>
              <div className="community-info">
                <h4>{c.name}</h4>
                <p>{c.lastMsg}</p>
                <span>{c.date}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No communities found</p>
        )}
      </div>
    </div>
  );
}
