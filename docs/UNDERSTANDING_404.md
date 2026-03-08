# Understanding "Failed to load resource: 404"

A **404** means the server received the request but **no route matched** the URL (or method). Here’s how to interpret and fix it.

---

## 1. Where is the 404 coming from?

- **Browser DevTools → Network tab**: click the failed request and check:
  - **Request URL** – which host and path (e.g. `http://localhost:5173/api/tasks` or `https://your-frontend.onrender.com/api/tasks`).
  - **Status** – 404.

That tells you whether the request hit the frontend (Vite / static host) or the backend (Express).

---

## 2. Common causes and fixes

### A. Request goes to the frontend instead of the API

- **What happens:** You deploy the React app (e.g. on Render). The app does `fetch("/api/tasks")`, so the browser requests `https://your-frontend.onrender.com/api/tasks`. That host serves the **static frontend**; it has no `/api/tasks` route, so you get **404**.
- **Fix:** The frontend must call the **backend URL**, not a path on the frontend origin. Use an env variable (e.g. `VITE_API_URL`) and build the request URL from it, e.g. `fetch(\`${import.meta.env.VITE_API_URL}/api/tasks\`)`. In production, set `VITE_API_URL` to your backend base URL (e.g. `https://your-api.onrender.com`).

### B. Backend not running (local dev)

- **What happens:** You run only the client (`npm run dev` in `client/`). Vite proxies `/api` to `http://localhost:5000`. If nothing is listening on 5000, the proxy gets “connection refused” and the browser may show a failed request (sometimes reported as 404 or “Failed to load resource”).
- **Fix:** Start the API in another terminal: `cd server && npm run dev` (or `npm start`). Then reload the app.

### C. Wrong path or method

- **What happens:** The client calls a path the server doesn’t define (e.g. `/api/task` instead of `/api/tasks`, or `GET` instead of `POST`). The Express app returns 404.
- **Fix:** Use exactly:
  - `GET /api/tasks` – list tasks  
  - `POST /api/tasks` – create task  
  - `PATCH /api/tasks/:id` – toggle completed  
  - `DELETE /api/tasks/:id` – delete task  

  Check your `fetch` URLs and methods in `TaskList.jsx`, `TaskItem.jsx`, and `TaskForm.jsx`.

### D. Favicon or other asset

- **What happens:** The browser requests `/favicon.ico` (or another asset) from the same host. The API server has no route for it and returns 404.
- **Fix:** You can ignore this; it doesn’t affect the app. Optionally add a favicon under `client/public/` so the dev server serves it, or add a minimal `GET /favicon.ico` on the backend that returns 204.

---

## 3. Quick checklist

| Check | Action |
|-------|--------|
| Local dev: is the API running? | Run `npm run dev` in `server/` and ensure you see “running on port 5000”. |
| Is the request URL correct? | In Network tab, confirm the failing request is to `/api/tasks` (or `/api/tasks/:id`) on the **backend** host. |
| Deployed: does the frontend know the API URL? | Set `VITE_API_URL` and use it in all `fetch` calls for production builds. |
| CORS | If the request is to the correct backend and still fails, check CORS: backend must allow the frontend origin (e.g. `http://localhost:5173` or your Render frontend URL). |

---

## 4. API 404 response (this project)

The backend now returns **JSON** for unknown routes instead of Express’s default HTML:

```json
{ "error": "Not found", "path": "GET /wrong-path" }
```

So if you get a 404 with a body like that, the request reached the Express server but the path (or method) doesn’t match any route. Adjust the URL or method in your client code to match the table in the README.
