// pages/Tasks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/config";
import TaskCard from "../components/TaskCard";
import { useModal } from "../context/ModalContext";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { toggleModal, setIsEditMode, setEditingEntry, triggerRefetch } = useModal();
  const fetchTasks = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };


  //toggle complete handler
  const handleToggleComplete = async (taskId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.patch(
        `http://localhost:5000/api/tasks/toggle-complete/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      triggerRefetch();
    } catch (err) {
      console.error("Failed to toggle complete:", err);
    }
  };




  //for delte functionality:

  // backend:
  // -routes mai router lga do delete ka
  // -controller bnayenge in which it will crosscheck the id of the added task so that it can delete that specific task.

  // frontend:
  // task.js mai delete function likh diya
  // usko taskcard.jsx mai prop pass kar diya delete function
  // taskcard mai receive krliya delte function aur usme button bana ke call krdiya

  const handleDelete = async (taskId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      triggerRefetch(); // Refresh list
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [triggerRefetch]); // Fetch again when refetch is triggered

  const handleEdit = (task) => {
    setIsEditMode(true);
    setEditingEntry(task);
    toggleModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Your Tasks</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setEditingEntry(null);
            toggleModal();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDelete(task._id)}
            onToggleComplete={() =>handleToggleComplete(task._id)}

          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
