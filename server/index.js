import express from "express";
import cors from "cors";
import * as taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json({ limit: "100kb" }));

// Allow frontend origins (local + deployed). Set CLIENT_ORIGIN on Render to your frontend URL.
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-ai-assignment-1-swur.onrender.com",
  process.env.CLIENT_ORIGIN,
].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

app.get("/api/tasks", taskRoutes.getAll);
app.post("/api/tasks", taskRoutes.create);
app.patch("/api/tasks/:id", taskRoutes.toggleCompleted);
app.delete("/api/tasks/:id", taskRoutes.remove);

app.get("/health", (req, res) => res.json({ ok: true }));

// 404 for any other route (so API always returns JSON, not HTML)
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.method + " " + req.path });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});