import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Dashboard from "../components/Dashboard";
import "../styles/discussion.css";

export default function Discussion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "How to integrate API?",
      description: "Struggling with Axios and backend integration.",
      domain: "Web Development",
      image: "",
      postedBy: "me",
      answers: [
        { id: 1, name: "Alice", answer: "Use Axios with interceptors", worked: false },
      ],
    },
    {
      id: 2,
      title: "React State Issue",
      description: "State not updating properly in functional components.",
      domain: "ReactJS",
      image: "",
      postedBy: "other",
      answers: [
        { id: 1, name: "Charlie", answer: "Check useEffect dependencies.", worked: false },
      ],
    },
  ]);

  const [viewMode, setViewMode] = useState("others"); // "mine" or "others"
  const [showModal, setShowModal] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: "", description: "", domain: "", image: "" });
  const [answerText, setAnswerText] = useState("");
  const [answeringId, setAnsweringId] = useState(null);
  const [showAnswers, setShowAnswers] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleAddIssue = () => {
    if (!newIssue.title.trim() || !newIssue.description.trim() || !newIssue.domain.trim()) return;
    const newEntry = {
      id: issues.length + 1,
      ...newIssue,
      postedBy: "me",
      answers: [],
    };
    setIssues([newEntry, ...issues]);
    setNewIssue({ title: "", description: "", domain: "", image: "" });
    setShowModal(false);
  };

  const handlePostAnswer = (id) => {
    if (!answerText.trim()) return;
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              answers: [
                ...issue.answers,
                { id: issue.answers.length + 1, name: "You", answer: answerText, worked: false },
              ],
            }
          : issue
      )
    );
    setAnswerText("");
    setAnsweringId(null);
  };

  const handleDeleteIssue = (id) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  };

  const toggleWorked = (issueId, answerId) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              answers: issue.answers.map((ans) =>
                ans.id === answerId ? { ...ans, worked: !ans.worked } : ans
              ),
            }
          : issue
      )
    );
  };

  const filteredIssues = issues.filter((i) =>
    viewMode === "mine" ? i.postedBy === "me" : i.postedBy !== "me"
  );

  return (
    <div className="discussion-page">
      {/* Sidebar Dashboard */}
      <Dashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button className="dashboard-icon" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <h2>Discussion Board</h2>

      {/* Toggle Button for Mine vs Others */}
      <div className="toggle-switch">
        <button
          className={viewMode === "others" ? "active" : ""}
          onClick={() => setViewMode("others")}
        >
          Others
        </button>
        <button
          className={viewMode === "mine" ? "active" : ""}
          onClick={() => setViewMode("mine")}
        >
          Mine
        </button>
      </div>

      {/* Add Issue */}
      <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Issue</button>

      {/* Issues List */}
      <div className="issue-list">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              {issue.image && <img src={issue.image} alt={issue.title} className="issue-image" />}
              <p><strong>Domain:</strong> {issue.domain}</p>

              {/* For "Others" view → Answer Option */}
              {viewMode === "others" && (
                <>
                  {answeringId === issue.id ? (
                    <div className="answer-box">
                      <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Type your answer..."
                      ></textarea>
                      <button onClick={() => handlePostAnswer(issue.id)}>Send</button>
                    </div>
                  ) : (
                    <button className="answer-btn" onClick={() => setAnsweringId(issue.id)}>Answer</button>
                  )}
                </>
              )}

              {/* For "Mine" view → Delete + Show Answers */}
              {viewMode === "mine" && (
                <>
                  <div className="card-actions">
                    <button className="delete-btn" onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
                    <button
                      className="answer-btn"
                      onClick={() => setShowAnswers(showAnswers === issue.id ? null : issue.id)}
                    >
                      Answers
                    </button>
                  </div>

                  {showAnswers === issue.id && (
                    <table className="answers-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Answer</th>
                          <th>Worked</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issue.answers.length > 0 ? (
                          issue.answers.map((ans) => (
                            <tr key={ans.id}>
                              <td>{ans.name}</td>
                              <td>{ans.answer}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={ans.worked}
                                  onChange={() => toggleWorked(issue.id, ans.id)}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>No answers yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No issues found.</p>
        )}
      </div>

      {/* Modal for Adding Issue */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Issue</h2>
            <input
              type="text"
              placeholder="Short Title"
              value={newIssue.title}
              onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newIssue.description}
              onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Target Domain (e.g., Web, React, AI)"
              value={newIssue.domain}
              onChange={(e) => setNewIssue({ ...newIssue, domain: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newIssue.image}
              onChange={(e) => setNewIssue({ ...newIssue, image: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleAddIssue}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}