/**
 * Form to add a new task (title + priority).
 * Validates and submits via POST /api/tasks.
 */
import { useState } from "react";

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function TaskForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title is required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed, priority }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add task");
        return;
      }
      setTitle("");
      setPriority("medium");
      onAdded?.(data);
    } catch (err) {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form-input"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        aria-label="Task title"
      />
      <select
        className="task-form-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        disabled={submitting}
        aria-label="Priority"
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Adding…" : "Add"}
      </button>
      {error && <p className="task-form-error">{error}</p>}
    </form>
  );
}
