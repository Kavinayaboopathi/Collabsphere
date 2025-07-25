import { useState } from "react";
import "../styles/tracker.css";

export default function ProjectTracker() {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Frontend Module",
      tasks: [
        {
          id: 1,
          task: "Build Navbar",
          assignee: "Alice",
          assignedDate: "2025-07-24",
          completedDate: "",
        },
        {
          id: 2,
          task: "Design UI",
          assignee: "Alice",
          assignedDate: "2025-07-25",
          completedDate: "",
        },
      ],
    },
    {
      id: 2,
      title: "Backend APIs",
      tasks: [
        {
          id: 1,
          task: "Setup DB",
          assignee: "Bob",
          assignedDate: "2025-07-24",
          completedDate: "",
        },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [assignedDate, setAssignedDate] = useState("");

  const handleCheckbox = (moduleId, taskId) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              tasks: mod.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      completedDate: task.completedDate
                        ? ""
                        : new Date().toISOString().split("T")[0],
                    }
                  : task
              ),
            }
          : mod
      )
    );
  };

  const handleDeleteTask = (moduleId, taskId) => {
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              tasks: mod.tasks.filter((task) => task.id !== taskId),
            }
          : mod
      )
    );
  };

  const handleAddTask = () => {
    if (!moduleName.trim() || !taskName.trim() || !assignee.trim() || !assignedDate) return;

    setModules((prev) => {
      const existingModule = prev.find(
        (mod) => mod.title.toLowerCase() === moduleName.toLowerCase()
      );

      if (existingModule) {
        return prev.map((mod) =>
          mod.title.toLowerCase() === moduleName.toLowerCase()
            ? {
                ...mod,
                tasks: [
                  ...mod.tasks,
                  {
                    id: mod.tasks.length + 1,
                    task: taskName,
                    assignee,
                    assignedDate,
                    completedDate: "",
                  },
                ],
              }
            : mod
        );
      } else {
        return [
          ...prev,
          {
            id: prev.length + 1,
            title: moduleName,
            tasks: [
              {
                id: 1,
                task: taskName,
                assignee,
                assignedDate,
                completedDate: "",
              },
            ],
          },
        ];
      }
    });

    setShowModal(false);
    setModuleName("");
    setTaskName("");
    setAssignee("");
    setAssignedDate("");
  };

  return (
    <div className="tracker-page">
      <h2>Project Tracker</h2>

      <button className="add-task-top-btn" onClick={() => setShowModal(true)}>
        + Add Module/Task
      </button>

      <div className="tracker-list">
        {modules.map((mod) => {
          const allCompleted =
            mod.tasks.length > 0 && mod.tasks.every((task) => task.completedDate);

          return (
            <div key={mod.id} className="tracker-card">
              <div className="tracker-header">
                <h3>{mod.title}</h3>
                {allCompleted && <span className="badge">Completed</span>}
              </div>

              <table className="task-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Assigned Date</th>
                    <th>Completed Date</th>
                    <th>Done</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.task}</td>
                      <td>{task.assignee}</td>
                      <td>{task.assignedDate}</td>
                      <td>{task.completedDate || "-"}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!task.completedDate}
                          onChange={() => handleCheckbox(mod.id, task.id)}
                        />
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteTask(mod.id, task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Task / Module</h2>
            <input
              type="text"
              placeholder="Module Name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Assigned To"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
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