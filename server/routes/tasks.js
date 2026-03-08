/**
 * REST API routes for tasks.
 * GET /api/tasks, POST /api/tasks, PATCH /api/tasks/:id, DELETE /api/tasks/:id
 */

import { v4 as uuidv4 } from "uuid";
import * as store from "../store.js";

const VALID_PRIORITIES = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 500;

/** GET /api/tasks - return all tasks */
export function getAll(req, res) {
  const tasks = store.getAllTasks();
  res.json(tasks);
}

/** POST /api/tasks - add task (title required, optional priority) */
export function create(req, res) {
  const { title, priority = "medium" } = req.body ?? {};

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required and must be a string" });
  }

  const trimmed = title.trim();
  if (!trimmed) {
    return res.status(400).json({ error: "title cannot be empty" });
  }
  if (trimmed.length > MAX_TITLE_LENGTH) {
    return res.status(400).json({
      error: `title must be at most ${MAX_TITLE_LENGTH} characters`,
    });
  }

  const priorityLower = String(priority).toLowerCase();
  if (!VALID_PRIORITIES.includes(priorityLower)) {
    return res.status(400).json({
      error: `priority must be one of: ${VALID_PRIORITIES.join(", ")}`,
    });
  }

  const task = {
    id: uuidv4(),
    title: trimmed,
    priority: priorityLower,
    completed: false,
  };
  store.addTask(task);
  res.status(201).json(task);
}

/** PATCH /api/tasks/:id - toggle completed */
export function toggleCompleted(req, res) {
  const { id } = req.params;
  const task = store.getTaskById(id);
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  const updated = store.updateTask(id, { completed: !task.completed });
  res.json(updated);
}

/** DELETE /api/tasks/:id - remove task */
export function remove(req, res) {
  const { id } = req.params;
  const removed = store.removeTask(id);
  if (!removed) {
    return res.status(404).json({ error: "task not found" });
  }
  res.status(204).send();
}
