// ✅ CLEANED-UP VERSION OF AddEntryModal.jsx WITH CONTROLLED INPUT FIX

import { useModal } from "../../context/ModalContext";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import axios from "axios";

const AddEntryModal = () => {
  const {
    isModalOpen,
    toggleModal,
    isEditMode,
    editingEntry,
    setIsEditMode,
    setEditingEntry,
    triggerRefetch,
  } = useModal();

  const [entryType, setEntryType] = useState("journal");

  // Journal state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("calm");
  const [tag, setTag] = useState("");
  const [journalType, setJournalType] = useState("personal");

  // Task state
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("calm");
    setTag("");
    setJournalType("personal");
    setTaskTitle("");
    setDueDate("");
    setStatus("pending");
    setPriority("medium");
    setError("");
  };

  useEffect(() => {
    if (isEditMode && editingEntry) {
      if (editingEntry.content !== undefined) {
        setEntryType("journal");
        setTitle(editingEntry.title || "");
        setContent(editingEntry.content || "");
        setMood(editingEntry.mood || "calm");
        setTag(editingEntry.tag || "");
        setJournalType(editingEntry.jtype || "personal");
      } else {
        setEntryType("task");
        setTaskTitle(editingEntry.title || "");
        setDueDate(editingEntry.dueDate?.slice(0, 10) || "");
        setStatus(editingEntry.status || "pending");
        setPriority(editingEntry.priority || "medium");
      }
    } else {
      resetForm();
    }
  }, [isModalOpen, isEditMode, editingEntry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      const token = await user.getIdToken();

      const headers = { Authorization: `Bearer ${token}` };
      let url = "";
      let method = isEditMode ? "put" : "post";
      let payload = {};

      if (entryType === "journal") {
        url = isEditMode
          ? `http://localhost:5000/api/journals/${editingEntry._id}`
          : `http://localhost:5000/api/journals/add`
        payload = { title, content, mood, tag, jtype: journalType };
      } else {
        url = isEditMode
          ? `http://localhost:5000/api/tasks/${editingEntry._id}`
          : `http://localhost:5000/api/tasks/add`;
        payload = { title: taskTitle, dueDate, status, priority };
      }

      const response = await axios[method](url, payload, { headers });
      console.log(`${entryType} ${isEditMode ? "updated" : "added"}:`, response.data);

      toggleModal();
      setIsEditMode(false);
      setEditingEntry(null);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(`Failed to save ${entryType}. Try again.`);
    } finally {
      setLoading(false);
      triggerRefetch();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[4px] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => {
            toggleModal();
            setIsEditMode(false);
            setEditingEntry(null);
            resetForm();
          }}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? `Edit ${entryType === "journal" ? "Journal" : "Task"}` : `New ${entryType === "journal" ? "Journal" : "Task"}`}
        </h2>

        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setEntryType("journal")}
            className={`px-4 py-2 rounded-full border ${entryType === "journal" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          >
            Journal
          </button>
          <button
            onClick={() => setEntryType("task")}
            className={`px-4 py-2 rounded-full border ${entryType === "task" ? "bg-green-600 text-white" : "bg-white text-black"}`}
          >
            Task
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {entryType === "journal" ? (
            <>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                required
              />
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg"
              >
                <option value="happy">😊 Happy</option>
                <option value="sad">😢 Sad</option>
                <option value="calm">😌 Calm</option>
                <option value="angry">😡 Angry</option>
              </select>
              <input
                type="text"
                placeholder="Tag or category"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <select
                value={journalType}
                onChange={(e) => setJournalType(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
              <textarea
                placeholder="Write your journal here..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg resize-none"
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="date"
                value={dueDate || ""}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </>
          )}

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
            disabled={loading}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update"
              : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;