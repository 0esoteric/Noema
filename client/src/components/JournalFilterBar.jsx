

// import { useState, useEffect } from "react";

// const JournalFilterBar = ({ filters, setFilters }) => {
//   // Local states for controlled inputs
//   const [title, setTitle] = useState(filters.title || "");
//   const [mood, setMood] = useState(filters.mood || "");
//   const [tag, setTag] = useState(filters.tag || "");
//   const [jtype, setJtype] = useState(filters.jtype || "");
//   const [dateRange, setDateRange] = useState(filters.dateRange || "");
  

//   // If filters prop changes externally, update local states accordingly
//   useEffect(() => {
//     setTitle(filters.title || "");
//     setMood(filters.mood || "");
//     setTag(filters.tag || "");
//     setJtype(filters.jtype || "");
//     setDateRange(filters.dateRange || "");
//   }, [filters]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Use setFilters to update filter state in parent
//     setFilters({
//       title,
//       mood,
//       tag,
//       jtype,
//       dateRange, 
      
//     });
//   };

//   const handleClear = () => {
//     setTitle("");
//     setMood("");
//     setTag("");
//     setJtype("");
//     setDateRange("");
    
//     setFilters({
//       title: "",
//       mood: "",
//       tag: "",
//       jtype: "",
//       dateRange: "",
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-emerald-800 p-4 rounded mb-6 grid md:grid-cols-3 gap-4"
//     >
//       <input
//         type="text"
//         placeholder="Search Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="px-3 py-2 rounded bg-gray-200 text-black"
//       />

//       <select
//         value={mood}
//         onChange={(e) => setMood(e.target.value)}
//         className="px-3 py-2 rounded bg-gray-200 text-black"
//       >
//         <option value="">Mood</option>
//         <option value="happy">😊 Happy</option>
//         <option value="sad">😢 Sad</option>
//         <option value="angry">😡 Angry</option>
//         <option value="neutral">😌 Neutral</option>
//       </select>

//       <input
//         type="text"
//         placeholder="Tag"
//         value={tag}
//         onChange={(e) => setTag(e.target.value)}
//         className="px-3 py-2 rounded bg-gray-200 text-black"
//       />

//       <select
//         value={jtype}
//         onChange={(e) => setJtype(e.target.value)}
//         className="px-3 py-2 rounded bg-gray-200 text-black"
//       >
//         <option value="">Category</option>
//         <option value="personal">🧠 Personal</option>
//         <option value="work">💼 Work</option>
//       </select>

//       <input
//         type="date"
//         value={dateRange}
//         onChange={(e) => setDateRange(e.target.value)}
//         className="px-3 py-2 rounded bg-gray-200 text-black"
//       />

//       <div className="md:col-span-3 flex gap-2 mt-2">
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Apply Filters
//         </button>
//         <button
//           type="button"
//           onClick={handleClear}
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           Clear
//         </button>
//       </div>
//     </form>
//   );
// };

// export default JournalFilterBar;

import { useState, useEffect } from "react";

const JournalFilterBar = ({ filters, setFilters }) => {
  // local controlled inputs
  const [title,     setTitle]     = useState(filters.title     || "");
  const [mood,      setMood]      = useState(filters.mood      || "");
  const [tag,       setTag]       = useState(filters.tag       || "");
  const [jtype,     setJtype]     = useState(filters.jtype     || "");
  const [dateRange, setDateRange] = useState(filters.dateRange || "");

  /* sync with parent resets */
  useEffect(() => {
    setTitle(filters.title     || "");
    setMood(filters.mood       || "");
    setTag(filters.tag         || "");
    setJtype(filters.jtype     || "");
    setDateRange(filters.dateRange || "");
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ title, mood, tag, jtype, dateRange });
  };

  const handleClear = () => {
    setTitle(""); setMood(""); setTag(""); setJtype(""); setDateRange("");
    setFilters({ title: "", mood: "", tag: "", jtype: "", dateRange: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 border border-white/15 shadow-lg
                 rounded-xl mb-10 p-6
                 grid gap-6
                 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_auto]"
    >
      {/* search bar */}
      <input
        type="text"
        placeholder="Search title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="filter-input px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* quick filters */}
      <div className="flex flex-wrap gap-4">
        <select value={mood} onChange={(e)=>setMood(e.target.value)} className="filter-select px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="" >Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="angry">😡 Angry</option>
          <option value="neutral">😌 Neutral</option>
        </select>

        <select value={jtype} onChange={(e)=>setJtype(e.target.value)} className="filter-select px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Category</option>
          <option value="personal">🧠 Personal</option>
          <option value="work">💼 Work</option>
        </select>

        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e)=>setTag(e.target.value)}
          className="filter-input px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          value={dateRange}
          onChange={(e)=>setDateRange(e.target.value)}
          className="filter-input px-3 py-2 rounded-xl border border-gray-400 text-sm text-black bg-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* action buttons */}
      <div className="flex gap-3 self-start">
        <button type="submit" className="action-btn px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow">
          Apply
        </button>
        <button type="button" onClick={handleClear} className="action-btn px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white text-sm shadow">
          Clear
        </button>
      </div>
    </form>
  );
};

export default JournalFilterBar;


