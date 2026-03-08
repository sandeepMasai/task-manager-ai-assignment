/**
 * Single task row: title, priority badge, completed state, complete + delete actions.
 * Surfaces errors via onError instead of console.
 */
export default function TaskItem({ task, onToggle, onDelete, onError }) {
  const { id, title, priority, completed } = task;

  async function handleToggle() {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        const updated = await res.json();
        onToggle?.(updated);
      } else {
        const data = await res.json().catch(() => ({}));
        onError?.(data.error || "Failed to update task");
      }
    } catch (err) {
      onError?.("Network error. Please try again.");
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete?.(id);
      } else {
        const data = await res.json().catch(() => ({}));
        onError?.(data.error || "Failed to delete task");
      }
    } catch (err) {
      onError?.("Network error. Please try again.");
    }
  }

  return (
    <li className={`task-item ${completed ? "task-item--completed" : ""}`}>
      <button
        type="button"
        className="task-item-toggle"
        onClick={handleToggle}
        aria-label={completed ? "Mark incomplete" : "Mark complete"}
        title={completed ? "Mark incomplete" : "Mark complete"}
      >
        <span className="task-item-check">{completed ? "✓" : ""}</span>
      </button>
      <span className="task-item-title">{title}</span>
      <span className={`badge badge--${priority}`}>{priority}</span>
      <button
        type="button"
        className="btn btn-danger btn-sm task-item-delete"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
}
