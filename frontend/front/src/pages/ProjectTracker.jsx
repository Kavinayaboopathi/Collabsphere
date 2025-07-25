import { useState } from "react";
import "../styles/tracker1.css";

export default function ProjectTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Frontend Module", status: "In Progress", deadline: "2025-07-28" },
    { id: 2, title: "Backend APIs", status: "To Do", deadline: "2025-07-30" },
    { id: 3, title: "Testing Phase", status: "To Do", deadline: "2025-08-01" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");

  // Handle adding new task
  const handleAddTask = () => {
    if (!taskName.trim() || !deadline) return;

    setTasks((prev) => [
      ...prev,
      { id: prev.length + 1, title: taskName, status: "To Do", deadline }
    ]);

    setShowModal(false);
    setTaskName("");
    setDeadline("");
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Sort tasks by deadline ascending
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="tracker-page">
      <h2>Project Task Tracker</h2>

      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        + Add Task
      </button>

      <div className="task-list vertical">
        {sortedTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <p><strong>Deadline:</strong> {task.deadline}</p>

            <label>
              <strong>Status:</strong>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>

            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Adding Task */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddTask}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}