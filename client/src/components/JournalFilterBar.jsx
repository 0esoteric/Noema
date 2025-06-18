// // components/JournalFilterBar.jsx
// import { useState } from "react";

// const JournalFilterBar = ({ filters, setFilters }) => {
//   const [title, setTitle] = useState("");
//   const [mood, setMood] = useState("");
//   const [tag, setTag] = useState("");
//   const [jtype, setJtype] = useState("");
//   const [date, setDate] = useState("");
//   const [lastDays, setLastDays] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     filters({ title, mood, tag, jtype, date, lastDays });
//   };

//   const handleClear = () => {
//     setTitle("");
//     setMood("");
//     setTag("");
//     setJtype("");
//     setDate("");
//     setLastDays("");
//     setFilters({}); // Clear filters
//   };

//   return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="bg-emerald-800 p-4 rounded mb-6 grid md:grid-cols-3 gap-4"
    // >
    //   <input
    //     type="text"
    //     placeholder="Search Title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   />

    //   <select
    //     value={mood}
    //     onChange={(e) => setMood(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   >
    //     <option value="">Mood</option>
    //     <option value="happy">😊 Happy</option>
    //     <option value="sad">😢 Sad</option>
    //     <option value="angry">😡 Angry</option>
    //     <option value="neutral">😌 Neutral</option>
    //   </select>

    //   <input
    //     type="text"
    //     placeholder="Tag"
    //     value={tag}
    //     onChange={(e) => setTag(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   />

    //   <select
    //     value={jtype}
    //     onChange={(e) => setJtype(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   >
    //     <option value="">Category</option>
    //     <option value="personal">🧠 Personal</option>
    //     <option value="work">💼 Work</option>
    //   </select>

    //   <input
    //     type="date"
    //     value={date}
    //     onChange={(e) => setDate(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   />

    //   <select
    //     value={lastDays}
    //     onChange={(e) => setLastDays(e.target.value)}
    //     className="px-3 py-2 rounded bg-gray-200 text-black"
    //   >
    //     <option value="">Time Filter</option>
    //     <option value="1">Last 1 day</option>
    //     <option value="7">Last 7 days</option>
    //     <option value="30">Last 30 days</option>
    //   </select>

    //   <div className="md:col-span-3 flex gap-2 mt-2">
    //     <button
    //       type="submit"
    //       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    //     >
    //       Apply Filters
    //     </button>
    //     <button
    //       type="button"
    //       onClick={handleClear}
    //       className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    //     >
    //       Clear
    //     </button>
    //   </div>
    // </form>
//   );
// };

// export default JournalFilterBar;

import { useState, useEffect } from "react";

const JournalFilterBar = ({ filters, setFilters }) => {
  // Local states for controlled inputs
  const [title, setTitle] = useState(filters.title || "");
  const [mood, setMood] = useState(filters.mood || "");
  const [tag, setTag] = useState(filters.tag || "");
  const [jtype, setJtype] = useState(filters.jtype || "");
  const [dateRange, setDateRange] = useState(filters.dateRange || "");
  

  // If filters prop changes externally, update local states accordingly
  useEffect(() => {
    setTitle(filters.title || "");
    setMood(filters.mood || "");
    setTag(filters.tag || "");
    setJtype(filters.jtype || "");
    setDateRange(filters.dateRange || "");
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use setFilters to update filter state in parent
    setFilters({
      title,
      mood,
      tag,
      jtype,
      dateRange, 
      
    });
  };

  const handleClear = () => {
    setTitle("");
    setMood("");
    setTag("");
    setJtype("");
    setDateRange("");
    
    setFilters({
      title: "",
      mood: "",
      tag: "",
      jtype: "",
      dateRange: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-emerald-800 p-4 rounded mb-6 grid md:grid-cols-3 gap-4"
    >
      <input
        type="text"
        placeholder="Search Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 text-black"
      />

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 text-black"
      >
        <option value="">Mood</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="angry">😡 Angry</option>
        <option value="neutral">😌 Neutral</option>
      </select>

      <input
        type="text"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 text-black"
      />

      <select
        value={jtype}
        onChange={(e) => setJtype(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 text-black"
      >
        <option value="">Category</option>
        <option value="personal">🧠 Personal</option>
        <option value="work">💼 Work</option>
      </select>

      <input
        type="date"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-3 py-2 rounded bg-gray-200 text-black"
      />

      <div className="md:col-span-3 flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default JournalFilterBar;

