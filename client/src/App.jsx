/**
 * Root component: centered container and TaskList (fetch, add, toggle, delete, filter).
 */
import TaskList from "./components/TaskList.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-main">
        <TaskList />
      </main>
    </div>
  );
}
