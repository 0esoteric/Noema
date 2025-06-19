// // components/TaskCard.jsx
// const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
//     return (
//         <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
//             {/* togglecomplete */}
//             <button
//                 onClick={() => onToggleComplete(task._id)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//             >
//                 {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
//             </button>
            
//             <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">{task.title}</h3>
//                 <span
//                     className={`px-3 py-1 rounded-full text-sm ${task.priority === "high"
//                             ? "bg-red-100 text-red-700"
//                             : task.priority === "medium"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : "bg-green-100 text-green-700"
//                         }`}
//                 >
//                     {task.priority}
//                 </span>
//             </div>
//             <p className="text-gray-600 mt-1">{task.status.toUpperCase()}</p>
//             {task.dueDate && (
//                 <p className="text-gray-500 text-sm mt-1">
//                     Due: {new Date(task.dueDate).toLocaleDateString()}
//                 </p>
//             )}
//             <div className="flex gap-3 mt-4">
//                 <button
//                     onClick={()=>onEdit(task._id)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={()=>onDelete(task._id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const priorityColor = {
    high:   "bg-red-300 text-red-900",
    medium: "bg-yellow-300 text-yellow-900",
    low:    "bg-green-300 text-green-900",
  }[task.priority] ?? "bg-gray-300 text-gray-900";

  return (
    <article
      className="group relative flex flex-col gap-4 p-5 rounded-2xl w-full
                 bg-white/5 backdrop-blur-md border border-white/10
                 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* COMPLETE TOGGLE */}
      <div className="flex justify-end">
        <button
          onClick={() => onToggleComplete(task._id)}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow
                      transition-colors z-10
                      ${task.completed
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-gray-200'}`}
        >
          {task.completed ? "Completed" : "Mark Done"}
        </button>
      </div>

      {/* TITLE & PRIORITY */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-lg md:text-xl font-bold text-gray-100 break-words flex-1">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold shrink-0 ${priorityColor}`}>
          {task.priority}
        </span>
      </div>

      {/* STATUS & DUE DATE */}
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
        <p className="text-indigo-200 uppercase tracking-wide">{task.status}</p>
        {task.dueDate && (
          <p className="text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      {task.description && (
        <p className="text-gray-200 text-sm whitespace-pre-wrap">
          {task.description}
        </p>
      )}

      {/* FOOTER BUTTONS */}
      <footer
        className="mt-auto flex gap-3 justify-end
                   md:opacity-0 md:group-hover:opacity-100
                   transition-opacity duration-300"
      >
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700
                     text-white text-sm shadow-sm transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700
                     text-white text-sm shadow-sm transition-colors"
        >
          Delete
        </button>
      </footer>
    </article>
  );
};

export default TaskCard;
    

