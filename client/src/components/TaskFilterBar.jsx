import { useState, useEffect } from "react";

const TaskFilterBar = ({ filters, setFilters }) => {
  const [title, setTitle] = useState(filters.title || "");
  const [status, setStatus] = useState(filters.status || "");
  const [priority, setPriority] = useState(filters.priority || "");
  const [dueRange, setDueRange] = useState(filters.dueRange || "");

  useEffect(() => {
    setTitle(filters.title || "");
    setStatus(filters.status || "");
    setPriority(filters.priority || "");
    setDueRange(filters.dueRange || "");
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ title, status, priority, dueRange });
  };

  const clearAll = () => {
    setTitle("");
    setStatus("");
    setPriority("");
    setDueRange("");
    setFilters({ title: "", status: "", priority: "", dueRange: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-md
                 rounded-2xl p-6 mb-10 grid gap-6
                 md:grid-cols-[1fr_auto_auto]"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 text-sm rounded-xl border border-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Status</option>
          <option value="pending">To‑Do</option>
          {/* <option value="inprogress">In Progress</option> */}
          <option value="completed">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          value={dueRange}
          onChange={(e) => setDueRange(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 self-start flex-wrap">
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white text-sm shadow"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskFilterBar;
