import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/chat.css";

export default function Chat() {
  const { id } = useParams(); // Project/Community ID
  const [messages, setMessages] = useState([
    { sender: "me", text: "Hey team, any updates?" },
    { sender: "other", text: "Yes, deployment is almost done." },
    { sender: "me", text: "Great! Let's finalize by today." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="chat-page">
      {/* Header with Track Dropdown */}
      <div className="chat-header">
        <h3>Project #{id}</h3>
        <div className="track-dropdown">
          <button className="track-btn">Track ▼</button>
          <div className="track-menu">
            <p onClick={() => (window.location.href = "/your-track")}>Your Track</p>
            <p onClick={() => (window.location.href = "/project-track")}>Project Track</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === "me" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
