// components/TaskCard.jsx
const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            {/* togglecomplete */}
            <button
                onClick={() => onToggleComplete(task._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
                {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>
            
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm ${task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }`}
                >
                    {task.priority}
                </span>
            </div>
            <p className="text-gray-600 mt-1">{task.status.toUpperCase()}</p>
            {task.dueDate && (
                <p className="text-gray-500 text-sm mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={()=>onEdit(task._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={()=>onDelete(task._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
