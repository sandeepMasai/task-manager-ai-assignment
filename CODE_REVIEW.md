# Task Manager – Code Review: Issues & Fixes

## 1. Console logs / console.error in production code

**Where:** `client/src/components/TaskItem.jsx` (lines 17, 26)

**Issue:** `console.error("Toggle failed", err)` and `console.error("Delete failed", err)` are used when API calls fail. Relying on console for errors is a bad practice: users get no feedback, and in production you typically want errors in a logging/monitoring system, not the browser console.

**Fix:** Remove or replace with user-visible error handling (e.g. call an `onError` callback from the parent so the UI can show a toast or inline message). Do not depend on console for user-facing failure reporting.

---

## 2. Missing user-visible error handling in TaskItem

**Where:** `client/src/components/TaskItem.jsx` – `handleToggle` and `handleDelete`

**Issue:** When the PATCH or DELETE request fails (network error, 4xx/5xx), the code only logs to console. The list state is not updated, and the user sees no message. The UI can appear to do nothing or stay in a misleading state.

**Fix:** Surface errors to the parent (e.g. `onError(message)`) so TaskList can set an error state and display it. Optionally use optimistic updates and roll back on failure.

---

## 3. CORS allows any origin (security)

**Where:** `server/index.js` – `app.use(cors())`

**Issue:** Using `cors()` with no options allows requests from any origin. For a production app this is a security risk: any website can call your API on behalf of a user who has the app open.

**Fix:** Restrict to known frontend origins, e.g. `cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' })`. Use env for production URL.

---

## 4. No global error handler in Express

**Where:** `server/index.js` – no error middleware

**Issue:** If any route or middleware throws (e.g. bug, or `res.json()` with non-serializable data), the process can crash or send an HTML error page. There is no central place to return consistent JSON error responses and log errors.

**Fix:** Add an error middleware that catches errors, logs them, and responds with a JSON body and appropriate status code (e.g. 500). Register it after all routes.

---

## 5. Store returns live references (mutation risk)

**Where:** `server/store.js` – `getTaskById` returns `tasks.find(...)`; `getAllTasks` returns `[...tasks]` (new array but same object references).

**Issue:** Callers receive references to the same objects that live in the store. If any code mutates those objects (e.g. `task.completed = true` without going through `updateTask`), the in-memory state is mutated. That can cause subtle bugs and violates a clear “store is the single source of truth” pattern.

**Fix:** Return copies of task objects when reading (e.g. `getTaskById` return `task ? { ...task } : null`, and in `getAllTasks` return `tasks.map(t => ({ ...t }))`). Alternatively, return copies only at the API boundary in the route handlers.

---

## 6. No request body / title length limit

**Where:** `server/routes/tasks.js` – POST validation; `server/index.js` – `express.json()`.

**Issue:** Only presence and type of `title` are validated. A client could send an extremely long string (or a huge JSON body), which can hurt performance, memory, and storage. `express.json()` has a default limit (e.g. 100kb) but it’s not explicit.

**Fix:** Validate `title.length` (e.g. max 500 characters) and return 400 if exceeded. Optionally set an explicit body size limit: `express.json({ limit: '100kb' })`.

---

## 7. (Optional) No UUID format validation on :id

**Where:** `server/routes/tasks.js` – PATCH and DELETE use `req.params.id` directly.

**Issue:** Invalid or malicious path params (e.g. very long strings) are passed to the store. The store will not find a match and return 404, but validating UUID format could return 400 for bad input and avoid unnecessary work.

**Fix:** Use a small regex or a UUID library to validate `req.params.id`; if invalid, respond with 400 and a clear message.
