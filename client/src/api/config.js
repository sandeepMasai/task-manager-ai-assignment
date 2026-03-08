/**
 * API base URL. Empty in dev so Vite proxy is used.
 * In production: use VITE_API_URL if set, else default to deployed backend.
 */
const raw =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://task-manager-ai-assignment-6lqr.onrender.com" : "");
export const API_BASE = raw.replace(/\/$/, "");
