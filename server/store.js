/**
 * In-memory task store.
 * Tasks: { id (UUID), title, priority, completed }
 */

const tasks = [];

/** Return a shallow copy of all tasks to avoid callers mutating store state. */
export function getAllTasks() {
  return tasks.map((t) => ({ ...t }));
}

/** Return a shallow copy of the task or null; avoids exposing live reference. */
export function getTaskById(id) {
  const task = tasks.find((t) => t.id === id);
  return task ? { ...task } : null;
}

export function addTask(task) {
  tasks.push(task);
  return task;
}

export function updateTask(id, updates) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  return tasks[idx];
}

export function removeTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
