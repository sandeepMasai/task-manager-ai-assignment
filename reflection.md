# Reflection: Task Manager Full-Stack Assignment

## What Went Well

- **Clear separation of concerns** — Backend (Express + in-memory store) and frontend (React + Vite) are in separate folders (`server/`, `client/`) with a simple API contract. Routes are grouped in `server/routes/tasks.js`, and React components (TaskList, TaskItem, TaskForm, TaskFilter) each have a single responsibility.
- **RESTful API design** — GET/POST/PATCH/DELETE on `/api/tasks` and `/api/tasks/:id` map naturally to CRUD and toggle behaviour. UUIDs for task IDs keep them opaque and avoid guessable IDs.
- **Proxy setup** — Vite proxy for `/api` to `http://localhost:5000` lets the React app use relative URLs (`/api/tasks`) so the same code works in dev and against a deployed API with a different origin.
- **Validation** — Server validates `title` (required, non-empty, max length) and `priority` (allowed values). Error responses are JSON with clear messages and appropriate status codes (400, 404, 500).

## What Could Be Improved

- **Persistence** — In-memory storage resets on restart. Adding a real store (e.g. SQLite, PostgreSQL, or a JSON file) would make the app usable beyond a single process lifetime.
- **Testing** — No unit or integration tests yet. Adding tests for the API routes (e.g. with supertest) and for key React behaviour (e.g. with React Testing Library) would improve confidence when changing code.
- **Loading and optimistic updates** — Toggle and delete don’t show loading state; the UI only updates after the response. Optimistic updates (update UI immediately, roll back on error) would make the app feel faster.
- **Auth and multi-tenancy** — There is no authentication. For multiple users, we’d need auth and scoping tasks by user (or similar) so data is isolated.

## Technical Decisions

- **No database** — Chose an in-memory array to keep the assignment simple and dependency-free. The store module can be swapped for a DB layer later without changing the route handlers much.
- **CORS restricted by default** — After the code review, CORS was limited to `CLIENT_ORIGIN` (env or `http://localhost:5173`) instead of allowing all origins, to reduce risk in production.
- **Error handling** — Replaced `console.error` in TaskItem with an `onError` callback so failures (network or 4xx/5xx) are shown in the UI. The Express app has a global error middleware that returns JSON and avoids leaking stack traces.
- **Store returning copies** — `getAllTasks()` and `getTaskById()` return shallow copies of tasks so callers cannot accidentally mutate the in-memory store.

## Lessons Learned

1. **User-visible errors matter** — Relying on the console for failures is a bad habit; users need clear feedback when something goes wrong.
2. **Defensive copying** — Returning references from a “store” can lead to subtle bugs if any code mutates those objects; returning copies keeps the store as the single source of truth.
3. **Security in small steps** — Restricting CORS and adding a body size limit and error middleware are small changes that improve security and robustness.
4. **Documentation** — A short `CODE_REVIEW.md` and this reflection help future you (or reviewers) understand trade-offs and what to improve next.

## If I Did It Again

- Add a simple test suite from the start (API + at least one critical user flow in the UI).
- Consider optimistic updates for toggle and delete from the beginning.
- Add a `README` section on environment variables (e.g. `PORT`, `CLIENT_ORIGIN`) so deployment is clear.
