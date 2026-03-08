# task-manager-ai-assignment

Full-stack Task Manager: Express API + React (Vite) frontend with in-memory storage.

**Live:** [Frontend](https://task-manager-ai-assignment-1-swur.onrender.com/) · [API](https://task-manager-ai-assignment-6lqr.onrender.com/health)

## Folder structure

```
task-manager-ai-assignment/
├── client/                 # React (Vite) frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskFilter.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js      # proxy /api → http://localhost:5000
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   │   └── tasks.js
│   ├── store.js            # in-memory task store
│   ├── index.js
│   └── package.json
└── README.md
```

## Run the project

**Prerequisites:** Node.js 18+ and npm.

Use two terminals: start the API first, then the frontend.

| Step | Terminal 1 — API | Terminal 2 — Frontend |
|------|-------------------|------------------------|
| 1 | `cd server` | `cd client` |
| 2 | `npm install` | `npm install` |
| 3 | `npm start` (or `npm run dev`) | `npm run dev` |

- **API:** runs at [http://localhost:5000](http://localhost:5000) (health: `GET /health`).
- **App:** open the URL Vite prints (e.g. [http://localhost:5173](http://localhost:5173)). Requests to `/api/*` are proxied to the backend.

## API

| Method | Path              | Description                    |
|--------|-------------------|--------------------------------|
| GET    | /api/tasks        | Return all tasks               |
| POST   | /api/tasks        | Add task (body: title, priority) |
| PATCH  | /api/tasks/:id    | Toggle completed               |
| DELETE | /api/tasks/:id    | Delete task                    |

Task shape: `{ id (UUID), title, priority: "low"|"medium"|"high", completed: boolean }`.

---

## Deploy backend to Render

1. Push the repo to GitHub and connect it in [Render](https://render.com).
2. Create a **Web Service**, set **Root Directory** to `server`, **Build** to `npm install`, **Start** to `npm start`.
3. (Optional) Add env var **CLIENT_ORIGIN** = your frontend URL (e.g. `https://your-frontend.onrender.com`) so CORS allows it.
4. Backend URL will be like: `https://task-manager-ai-assignment-6lqr.onrender.com`.

## Use deployed backend in the frontend

For production builds, the frontend must call the deployed API URL. Set this when building or in Render (for the frontend service):

- **VITE_API_URL** = `https://task-manager-ai-assignment-6lqr.onrender.com`

Example: copy `client/.env.example` to `client/.env` and set `VITE_API_URL` to the backend URL, then run `npm run build` in `client/`. Or in Render’s frontend service, add **VITE_API_URL** in the environment and use the same value.


