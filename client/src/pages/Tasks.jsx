// // pages/Tasks.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { auth } from "../firebase/config";
// import TaskCard from "../components/TaskCard";
// import { useModal } from "../context/ModalContext";

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const { toggleModal, setIsEditMode, setEditingEntry, triggerRefetch } = useModal();
//   const fetchTasks = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;
//       const token = await user.getIdToken();

//       const res = await axios.get("http://localhost:5000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setTasks(res.data);
//     } catch (err) {
//       console.error("Failed to fetch tasks:", err);
//     }
//   };


//   //toggle complete handler
//   const handleToggleComplete = async (taskId) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       await axios.patch(
//         `http://localhost:5000/api/tasks/toggle-complete/${taskId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       triggerRefetch();
//     } catch (err) {
//       console.error("Failed to toggle complete:", err);
//     }
//   };




//   //for delete functionality:

//   // backend:
//   // -routes mai router lga do delete ka
//   // -controller bnayenge in which it will crosscheck the id of the added task so that it can delete that specific task.

//   // frontend:
//   // task.js mai delete function likh diya
//   // usko taskcard.jsx mai prop pass kar diya delete function
//   // taskcard mai receive krliya delte function aur usme button bana ke call krdiya

//   const handleDelete = async (taskId) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user.getIdToken();

//       await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       triggerRefetch(); // Refresh list
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [triggerRefetch]); // Fetch again when refetch is triggered

//   const handleEdit = (task) => {
//     setIsEditMode(true);
//     setEditingEntry(task);
//     toggleModal();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-semibold">Your Tasks</h1>
//         <button
//           onClick={() => {
//             setIsEditMode(false);
//             setEditingEntry(null);
//             toggleModal();
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           Add Task
//         </button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task._id}
//             task={task}
//             onEdit={() => handleEdit(task)}
//             onDelete={() => handleDelete(task._id)}
//             onToggleComplete={() =>handleToggleComplete(task._id)}

//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { auth } from "../firebase/config";
import TaskCard from "../components/TaskCard";
import TaskFilterBar from "../components/TaskFilterBar";
import { useModal } from "../context/ModalContext";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ title:"", status:"", priority:"", dueRange:"" });

  const { toggleModal, setIsEditMode, setEditingEntry, triggerRefetch } = useModal();

  /* fetch tasks (you can augment your API to accept query params) */
  const fetchTasks = useCallback( async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      const query = new URLSearchParams(filters).toString();

      const res = await axios.get(`http://localhost:5000/api/tasks?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }, [filters]);

  /* handlers */
  const handleToggleComplete = async (taskId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.patch(
        `http://localhost:5000/api/tasks/toggle-complete/${taskId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      triggerRefetch();
    } catch (err) {
      console.error("Failed to toggle complete:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      triggerRefetch();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = (task) => {
    setIsEditMode(true);
    setEditingEntry(task);
    toggleModal();
  };

  /* refetch on mount or trigger */
  useEffect(() => { fetchTasks(); }, [fetchTasks, triggerRefetch]);

  /* client‑side filter as fallback (in case API doesn’t filter yet) */
  const filteredTasks = tasks.filter(t => {
    const title  = t.title.toLowerCase().includes(filters.title.toLowerCase());
    const stat   = !filters.status   || t.status   === filters.status;
    const prio   = !filters.priority || t.priority === filters.priority;
    let   due    = true;
    if (filters.dueRange) {
      due = new Date(t.dueDate).toISOString().slice(0,10) === filters.dueRange;
    }
    return title && stat && prio && due;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950
                        text-gray-100 px-6 md:px-14 py-10">
      {/* filter bar */}
      <TaskFilterBar filters={filters} setFilters={setFilters} />

      {/* header + add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Your Tasks</h1>
        <button
          onClick={()=>{
            setIsEditMode(false);
            setEditingEntry(null);
            toggleModal();
          }}
          className="action-btn p-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700"
        >
          + Add Task
        </button>
      </div>

      {/* grid */}
      <div className="grid gap-10
                      sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="col-span-full text-center text-gray-400 italic">
            No tasks match your filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Tasks;
