/**
 * Fetches and displays tasks; supports filtering (All / Active / Completed).
 * Renders TaskItem for each task.
 */
import { useState, useEffect, useCallback } from "react";
import TaskItem from "./TaskItem.jsx";
import TaskForm from "./TaskForm.jsx";
import TaskFilter from "./TaskFilter.jsx";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [actionError, setActionError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setError("");
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Could not load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks =
    filter === "active"
      ? tasks.filter((t) => !t.completed)
      : filter === "completed"
        ? tasks.filter((t) => t.completed)
        : tasks;

  function handleTaskAdded() {
    fetchTasks();
  }

  function handleToggle(updated) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleActionError(message) {
    setActionError(message);
    // Clear after a few seconds so user can read it
    setTimeout(() => setActionError(""), 5000);
  }

  if (loading) {
    return (
      <div className="task-list-loading">
        Loading tasks…
      </div>
    );
  }

  return (
    <div className="task-list">
      <TaskForm onAdded={handleTaskAdded} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      {error && <p className="task-list-error">{error}</p>}
      {actionError && <p className="task-list-error">{actionError}</p>}
      <ul className="task-list-ul">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onError={handleActionError}
          />
        ))}
      </ul>
      {filteredTasks.length === 0 && (
        <p className="task-list-empty">
          {filter === "all" ? "No tasks yet. Add one above." : `No ${filter} tasks.`}
        </p>
      )}
    </div>
  );
}
