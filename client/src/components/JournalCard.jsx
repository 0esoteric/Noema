


// const JournalCard = ({ entry, onDelete, onEdit, onToggleComplete }) => {
//   return (
//     <div className="relative p-4 border rounded-md shadow-sm bg-gray-700 text-amber-300 hover:bg-amber-900 transition-colors">
//       {/* toggle complete */}
//       <button
//         onClick={() => onToggleComplete(entry._id)}
//         className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//       >
//         {entry.completed ? "Mark as Incomplete" : "Mark as Completed"}
//       </button>

//       {/* Title */}
//       <h2 className="text-xl font-bold mb-1">{entry.title}</h2>

//       {/* Tag (under title, slightly smaller) */}
//       {entry.tag && (
//         <span className="text-xs inline-block mb-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
//           🏷️ {entry.tag}
//         </span>
//       )}

//       {/* Content */}
//       <p className="text-blue-100 whitespace-pre-wrap">{entry.content}</p>

//       {/* Created at */}
//       <p className="text-sm text-gray-400 mt-2">
//         {new Date(entry.createdAt).toLocaleString()}
//       </p>

//       {/* Mood and Type in top-right corner */}
//       <div className="absolute top-3 right-3 flex flex-wrap gap-2 text-xs">
//         {entry.mood && (
//           <span
//             className={`px-2 py-1 rounded-full ${entry.mood === "happy"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : entry.mood === "sad"
//                   ? "bg-blue-100 text-blue-800"
//                   : entry.mood === "angry"
//                     ? "bg-red-100 text-red-800"
//                     : "bg-green-100 text-green-800"
//               }`}
//           >
//             {entry.mood === "happy"
//               ? "😊"
//               : entry.mood === "sad"
//                 ? "😢"
//                 : entry.mood === "angry"
//                   ? "😡"
//                   : "😌"}{" "}
//             {entry.mood}
//           </span>
//         )}

//         {entry.jtype && (
//           <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
//             {entry.jtype === "personal" ? "🧠 Personal" : "💼 Work"}
//           </span>
//         )}
//       </div>

//       {/* Action buttons */}
//       <div className="flex gap-3 mt-4">
//         <button
//           onClick={() => onDelete(entry._id)}
//           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//         >
//           Delete
//         </button>
//         <button
//           onClick={onEdit}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JournalCard;

const JournalCard = ({ entry, onDelete, onEdit, onToggleComplete }) => {
  const moodColor = {
    happy: "bg-yellow-300 text-yellow-900",
    sad: "bg-blue-300 text-blue-900",
    angry: "bg-red-300 text-red-900",
    neutral: "bg-green-300 text-green-900",
  }[entry.mood] ?? "bg-gray-300 text-gray-900";

  return (
    <article
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-white/10 
                 bg-white/5 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 
                 hover:-translate-y-1 w-full"
    >
      {/* COMPLETE TOGGLE BUTTON */}
      <button
        onClick={() => onToggleComplete(entry._id)}
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold 
                    transition-colors shadow z-10
                    ${entry.completed
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
          }`}
      >
        {entry.completed ? "Completed" : "Mark Done"}
      </button>

      {/* TITLE */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-100 break-words">
        {entry.title}
      </h2>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 text-sm">
        {entry.mood && (
          <span className={`px-2 py-1 rounded-full ${moodColor}`}>
            {entry.mood === "happy"
              ? "😊"
              : entry.mood === "sad"
                ? "😢"
                : entry.mood === "angry"
                  ? "😡"
                  : "😌"}{" "}
            {entry.mood}
          </span>
        )}
        {entry.jtype && (
          <span className="px-2 py-1 rounded-full bg-purple-300 text-purple-900">
            {entry.jtype === "personal" ? "🧠 Personal" : "💼 Work"}
          </span>
        )}
        {entry.tag && (
          <span className="px-2 py-1 rounded-full bg-gray-300 text-gray-900">
            🏷️ {entry.tag}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <p className="text-sm md:text-base text-gray-200 whitespace-pre-wrap break-words">
        {entry.content}
      </p>

      {/* FOOTER */}
      <footer className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-xs sm:text-sm">
        <time className="text-gray-400 italic">
          {new Date(entry.createdAt).toLocaleString()}
        </time>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 w-full sm:w-auto justify-end sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onEdit}
            className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(entry._id)}
            className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm shadow-sm"
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default JournalCard;

