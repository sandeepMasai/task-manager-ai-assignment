/**
 * Filter buttons: All / Active / Completed.
 */
const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          className={`btn btn-filter ${filter === f.value ? "btn-filter--active" : ""}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
