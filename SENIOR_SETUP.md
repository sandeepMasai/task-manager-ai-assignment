# Senior-Level Setup: Folder Structure & AI Prompts

A recommended folder structure and a sequence of AI prompts to build a full-stack assignment that looks senior-level in about 10 minutes.

---

## Perfect Folder Structure (Senior-Developer Style)

Use this layout so the project reads like a well-architected codebase: clear separation, easy to extend and test.

```
task-manager-ai-assignment/
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskFilter.jsx
│   │   ├── hooks/                   # Custom hooks (optional, for API/state)
│   │   │   └── useTasks.js
│   │   ├── api/                     # API client / fetch wrappers (optional)
│   │   │   └── tasks.js
│   │   ├── styles/                  # Global or shared CSS (optional)
│   │   │   └── variables.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Backend (Express)
│   ├── routes/                      # Route handlers by resource
│   │   └── tasks.js
│   ├── middleware/                  # Optional: validation, auth, error
│   │   └── errorHandler.js
│   ├── config/                      # Optional: env, constants
│   │   └── constants.js
│   ├── store.js                     # Or db/ for real DB
│   ├── index.js                     # App entry, CORS, mount routes
│   └── package.json
│
├── .env.example                     # Document env vars (no secrets)
├── README.md
├── CODE_REVIEW.md                   # Notes from code review
├── reflection.md                    # What went well, what you’d improve
└── SENIOR_SETUP.md                  # This file
```

**Why this looks senior:**

- **client/src**: `components/` for UI, optional `hooks/`, `api/`, `styles/` so responsibilities are obvious.
- **server**: `routes/` by resource, optional `middleware/` and `config/` so adding auth or a DB is straightforward.
- **Root**: `.env.example`, README, CODE_REVIEW, reflection show process and thought, not just code.

---

## AI Prompts to Build the Whole Project in ~10 Minutes

Use these prompts in order. Each one is scoped so the AI can generate the right files without redoing the whole app. Adjust stack names (e.g. “Express”, “React”, “Vite”) if you use different tech.

---

### Prompt 1: Project scaffold and backend (≈2 min)

```
Create a full-stack project called task-manager-ai-assignment.

Backend:
- Node.js + Express in a folder named server.
- Use express.json(), enable CORS, and add a health route GET /health.
- In-memory store: array of tasks. Each task: id (UUID), title (string), priority ("low"|"medium"|"high"), completed (boolean).
- REST API: GET /api/tasks, POST /api/tasks (validate title required), PATCH /api/tasks/:id (toggle completed), DELETE /api/tasks/:id.
- Put routes in server/routes/tasks.js and keep server/index.js clean (mount routes, no business logic).
- Return JSON with proper status codes (400, 404, 500) and error messages.
```

---

### Prompt 2: Frontend scaffold and proxy (≈1 min)

```
In the same repo, add a React app with Vite in a folder named client.
- Configure Vite proxy so /api is forwarded to http://localhost:5000.
- Use functional components and hooks only.
- Create an App that will hold a task list; leave a placeholder for the list for now.
- Add basic global CSS (reset, font, background). No component CSS yet.
```

---

### Prompt 3: React components (≈3 min)

```
For the Task Manager client, create these components in client/src/components:

1. TaskForm: input (title), select (priority: low/medium/high), submit button. On submit, POST to /api/tasks with JSON body. Show validation error if title empty. Clear form on success.

2. TaskItem: one task row. Show title, priority badge, and completed state. Buttons: "toggle complete" (PATCH /api/tasks/:id), "Delete" (DELETE /api/tasks/:id). Accept task, onToggle, onDelete props.

3. TaskFilter: three buttons — All, Active, Completed. Accept filter and onFilterChange props.

4. TaskList: fetch GET /api/tasks on mount, store in state. Render TaskForm, TaskFilter, then list of TaskItem. Filter list by All/Active/Completed. When a task is toggled or deleted, update state from the API response or by removing the task. Handle loading and fetch error (show message). Use task.id as key for TaskItem.

Wire TaskList into App so the app shows the full task manager UI.
```

---

### Prompt 4: Styling (≈2 min)

```
Add clean CSS for the Task Manager React app:
- Centered main container (max-width ~560px).
- Task cards: card style with padding and border-radius.
- Priority badges: low = green, medium = orange, high = red.
- Buttons for Add, Complete, Delete, Filter; make the active filter button clearly selected.
- Responsive: stack form and task row on small screens.
- No console.log or console.error in UI code; use state for errors if needed.
```

---

### Prompt 5: Hardening and docs (≈2 min)

```
Review the task-manager full-stack code and fix:

1. Remove any console.log/console.error; surface errors to the user (e.g. error state + message in UI).
2. Ensure CORS is restricted to the frontend origin (e.g. env CLIENT_ORIGIN or http://localhost:5173).
3. Add a global Express error middleware that returns JSON { error: "Internal server error" } and logs the real error.
4. In the in-memory store, return copies of tasks from getters (not live references) so callers can’t mutate store state.
5. Validate task title max length (e.g. 500 chars) on POST and return 400 with a clear message.
6. Add a short README with folder structure, how to run server and client, and API table (method, path, description).
```

---

## How to Use This

1. **Create repo** – e.g. `task-manager-ai-assignment`, clone locally.
2. **Run Prompt 1** – Paste in Cursor/Chat, let it generate `server/` and install deps.
3. **Run Prompt 2** – Same for `client/` and Vite proxy.
4. **Run Prompt 3** – Get all React components and wiring.
5. **Run Prompt 4** – Get styling.
6. **Run Prompt 5** – Get hardening and README.

Then add (or let the AI add):

- `reflection.md` – What went well, what you’d improve, lessons learned.
- `CODE_REVIEW.md` – If you did a pass: issues found and fixes.
- `.env.example` – e.g. `PORT=5000`, `CLIENT_ORIGIN=http://localhost:5173`.

Result: a full-stack task manager with clear structure, validation, error handling, and docs that look senior-level for an assignment or portfolio.
