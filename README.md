# task-manager-ai-assignment

Full-stack Task Manager: Express API + React (Vite) frontend with in-memory storage.

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


