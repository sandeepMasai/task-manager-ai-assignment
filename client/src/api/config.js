/**
 * API base URL. Empty in dev so Vite proxy is used; set VITE_API_URL in production.
 */
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
