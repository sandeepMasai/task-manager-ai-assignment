/**
 * Express server for Task Manager API.
 * CORS restricted to frontend origin, JSON body parsing, routes under /api/tasks.
 */

import express from "express";
import cors from "cors";
import * as taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT ?? 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Middleware: parse JSON bodies with explicit size limit
app.use(express.json({ limit: "100kb" }));

// Restrict CORS to known frontend origin (security)
app.use(cors({ origin: CLIENT_ORIGIN }));

// Mount task routes at /api/tasks
app.get("/api/tasks", taskRoutes.getAll);
app.post("/api/tasks", taskRoutes.create);
app.patch("/api/tasks/:id", taskRoutes.toggleCompleted);
app.delete("/api/tasks/:id", taskRoutes.remove);

// Health check (optional)
app.get("/health", (req, res) => res.json({ ok: true }));

// Global error handler: return JSON and avoid leaking stack to client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running at http://localhost:${PORT}`);
});
