import express from "express";
import cors from "cors";
import * as taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json({ limit: "100kb" }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-manager-ai-assignment-1-swur.onrender.com"
  ]
}));

app.get("/api/tasks", taskRoutes.getAll);
app.post("/api/tasks", taskRoutes.create);
app.patch("/api/tasks/:id", taskRoutes.toggleCompleted);
app.delete("/api/tasks/:id", taskRoutes.remove);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});