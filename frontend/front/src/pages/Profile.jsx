import { useRef, useState } from "react";
import "../styles/profile.css";
import { FaBars, FaEdit } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [profile, setProfile] = useState({
    name: "Moushmi Grace",
    phone: "9876543210",
    address: "Chennai, Tamil Nadu",
    email: "moushmi@example.com",
    year: "3",
    department: "Computer Science",
    domain: "AI/ML",
    cohort: "2022-2026",
    skills: "React, Node.js, MongoDB",
    profileLink: "https://github.com/moushmigrace",
    projects: 6,
    collaborators: 12,
    badges: ["Leadership", "Consistency", "Innovation"],
    totalBadges: 3,
    totalPoints: 540,
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const leaderboardData = [
    { name: "Moushmi Grace", points: 540 },
    { name: "Kavinaya", points: 460 },
    { name: "Megavarshini", points: 380 },
    { name: "Akshaya", points: 350 },
    { name: "Priya", points: 300 },
    { name: "Rahul", points: 280 },
    { name: "Arun", points: 200 },
  ]
    .sort((a, b) => b.points - a.points)
    .map((item, index) => ({ ...item, position: index + 1 }));

  const myRowRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const saveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const scrollToMyPosition = () => {
    if (myRowRef.current) {
      myRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const filteredData = leaderboardData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="profile-wrapper">
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      

      <div className="profile-container">
        {/* Left: Profile Info */}
        <div className="profile-info">
          <h2>My Profile</h2>
          {!isEditing ? (
            <div className="profile-card">
              <div className="profile-header">
                <h3>{profile.name}</h3>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </button>
              </div>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Year:</strong> {profile.year}</p>
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Interested Domain:</strong> {profile.domain}</p>
              <p><strong>Cohort:</strong> {profile.cohort}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p>
                <strong>Profile Link:</strong>{" "}
                <a href={profile.profileLink} target="_blank" rel="noopener noreferrer">
                  {profile.profileLink}
                </a>
              </p>
              <div className="profile-stats">
                <p><strong>Projects Done:</strong> {profile.projects}</p>
                <p><strong>Collaborated With:</strong> {profile.collaborators}</p>
                <p><strong>Badges:</strong> {profile.badges.join(", ")}</p>
                <p><strong>Total Badges:</strong> {profile.totalBadges}</p>
                <p><strong>Total Points:</strong> {profile.totalPoints}</p>
              </div>
            </div>
          ) : (
            <div className="edit-form">
              <input name="name" value={editedProfile.name} onChange={handleChange} placeholder="Name" />
              <input name="email" value={editedProfile.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={editedProfile.phone} onChange={handleChange} placeholder="Phone" />
              <input name="address" value={editedProfile.address} onChange={handleChange} placeholder="Address" />
              <input name="year" value={editedProfile.year} onChange={handleChange} placeholder="Year of Study" />
              <input name="department" value={editedProfile.department} onChange={handleChange} placeholder="Department" />
              <input name="domain" value={editedProfile.domain} onChange={handleChange} placeholder="Interested Domain" />
              <input name="cohort" value={editedProfile.cohort} onChange={handleChange} placeholder="Cohort" />
              <input name="skills" value={editedProfile.skills} onChange={handleChange} placeholder="Skills" />
              <input name="profileLink" value={editedProfile.profileLink} onChange={handleChange} placeholder="Profile Link" />
              <button onClick={saveProfile}>Save</button>
            </div>
          )}
        </div>

        {/* Right: Leaderboard List Format */}
        <div className="leaderboard-graph">
          <h3>Leaderboard</h3>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={scrollToMyPosition}>View My Position</button>
          </div>

          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => {
                const isMe = entry.name === profile.name;
                return (
                  <tr
                    key={entry.name}
                    ref={isMe ? myRowRef : null}
                    style={{
                      backgroundColor: isMe ? "#dff2fc" : "transparent",
                      fontWeight: isMe ? "bold" : "normal",
                    }}
                  >
                    <td>{entry.position}</td>
                    <td>{entry.name}</td>
                    <td>{entry.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}