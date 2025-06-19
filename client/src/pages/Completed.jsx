// pages/Completed.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/config";
import TaskCard from "../components/TaskCard";
import JournalCard from "../components/JournalCard"; // create this similar to TaskCard


const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedJournals, setCompletedJournals] = useState([]);
    useEffect(() => {
    fetchCompletedData();
  }, []);

  const fetchCompletedData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const taskRes = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const journalRes = await axios.get("http://localhost:5000/api/journals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allTasks = taskRes.data;
      const allJournals = journalRes.data;

      setCompletedTasks(allTasks.filter(task => task.completed));
      setCompletedJournals(allJournals.filter(j => j.completed));
    
    } catch (err) {
      console.error("Error fetching completed items:", err);
    }
  };



  return (
    <div className="p-6 bg-gray-900">
      <h1 className="text-3xl text-white font-semibold mb-6 text-center">✅ Completed Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Completed Tasks</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))
          ) : (
            <p className="text-gray-400">No completed tasks yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Completed Journals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {completedJournals.length > 0 ? (
            completedJournals.map((entry) => (
              <JournalCard key={entry._id} entry={entry} />
            ))
          ) : (
            <p className="text-gray-400">No completed journals yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Completed;
