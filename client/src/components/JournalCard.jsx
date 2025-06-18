// const JournalCard = ({ entry, onDelete, onEdit}) => {
//   return (
//     <div className="p-4 border rounded-md shadow-sm bg-gray-700 text-amber-300 hover:bg-amber-900 transition-colors">
//   <h2 className="text-xl font-bold mb-2">{entry.title}</h2>

//   {/* Metadata badges */}
//   <div className="flex flex-wrap gap-2 mb-2 text-sm">
//     {/* Mood */}
//     {entry.mood && (
//       <span className={`px-2 py-1 rounded-full ${
//         entry.mood === "happy"
//           ? "bg-yellow-100 text-yellow-800"
//           : entry.mood === "sad"
//           ? "bg-blue-100 text-blue-800"
//           : entry.mood === "angry"
//           ? "bg-red-100 text-red-800"
//           : "bg-green-100 text-green-800"
//       }`}>
//         {entry.mood === "happy"
//           ? "😊"
//           : entry.mood === "sad"
//           ? "😢"
//           : entry.mood === "angry"
//           ? "😡"
//           : "😌"}{" "}
//         {entry.mood}
//       </span>
//     )}

//     {/* Type */}
//     {entry.jtype && (
//       <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
//         {entry.jtype === "personal" ? "🧠 Personal" : "💼 Work"}
//       </span>
//     )}

//     {/* Tag */}
//     {entry.tag && (
//       <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
//         🏷️ {entry.tag}
//       </span>
//     )}
//   </div>

//   {/* Journal content */}
//   <p className="text-blue-100 whitespace-pre-wrap">{entry.content}</p>

//   <p className="text-sm text-gray-400 mt-2">
//     {new Date(entry.createdAt).toLocaleString()}
//   </p>

//   {/* Action buttons */}
//   <div className="flex gap-3 mt-4">
//     <button
//       onClick={() => onDelete(entry._id)}
//       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//     >
//       Delete
//     </button>
//     <button
//       onClick={onEdit}
//       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//     >
//       Edit
//     </button>
//   </div>
// </div>

//   );
// };

// export default JournalCard;


const JournalCard = ({ entry, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className="relative p-4 border rounded-md shadow-sm bg-gray-700 text-amber-300 hover:bg-amber-900 transition-colors">
      {/* toggle complete */}
      <button
        onClick={() => onToggleComplete(entry._id)}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        {entry.completed ? "Mark as Incomplete" : "Mark as Completed"}
      </button>

      {/* Title */}
      <h2 className="text-xl font-bold mb-1">{entry.title}</h2>

      {/* Tag (under title, slightly smaller) */}
      {entry.tag && (
        <span className="text-xs inline-block mb-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
          🏷️ {entry.tag}
        </span>
      )}

      {/* Content */}
      <p className="text-blue-100 whitespace-pre-wrap">{entry.content}</p>

      {/* Created at */}
      <p className="text-sm text-gray-400 mt-2">
        {new Date(entry.createdAt).toLocaleString()}
      </p>

      {/* Mood and Type in top-right corner */}
      <div className="absolute top-3 right-3 flex flex-wrap gap-2 text-xs">
        {entry.mood && (
          <span
            className={`px-2 py-1 rounded-full ${entry.mood === "happy"
                ? "bg-yellow-100 text-yellow-800"
                : entry.mood === "sad"
                  ? "bg-blue-100 text-blue-800"
                  : entry.mood === "angry"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
              }`}
          >
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
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            {entry.jtype === "personal" ? "🧠 Personal" : "💼 Work"}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onDelete(entry._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default JournalCard;

