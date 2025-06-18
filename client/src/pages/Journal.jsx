// import { useEffect, useState } from "react";
// import { auth } from "../firebase/config";
// import axios from "axios";
// import { useModal } from "../context/ModalContext"; // Import modal context
// import JournalCard from "../components/JournalCard";




// const JournalPage = () => {
//   const [journals, setJournals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { Refetch, triggerRefetch } = useModal();
//   const { toggleModal, setIsEditMode, setEditingEntry } = useModal();


//   /*Here we declared useeffect globally to refetch after add or edit journal, 
//         we created a useState of Refetch in ModalCOntext.jsx and created a triggerRefetch function there.
//         also we added triggerRefetch() in finally block That's how we made the refetch functionality work hehe!! */
//   useEffect(() => {
//     fetchJournals();
//   }, [Refetch]);

//   const fetchJournals = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("User not authenticated");

//       const token = await user.getIdToken();

//       const response = await axios.get("http://localhost:5000/api/journals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setJournals(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load journal entries.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleEdit = (entry) => {
//     setIsEditMode(true);
//     setEditingEntry(entry);
//     toggleModal();
//   };

//   const handleDelete = async (id) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("User not authenticated");

//       const token = await user.getIdToken();

//       await axios.delete(`http://localhost:5000/api/journals/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setJournals((prev) => prev.filter((journal) => journal._id !== id));

//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete journal entry.");
//     }
//   };

//   //toggle complete refetch may occur
//   const handleToggleComplete = async (journalId) => {
//   try {
//     const user = auth.currentUser;
//     const token = await user.getIdToken();

//     await axios.patch(
//       `http://localhost:5000/api/journals/toggle-complete/${journalId}`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     triggerRefetch();
//   } catch (err) {
//     console.error("Failed to toggle journal completion:", err);
//   }
// };



//   return (
//     <div className="p-6 bg-emerald-900 text-white min-h-screen">
//       <h1 className="text-3xl font-semibold mb-6">Your Journal Entries</h1>


//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="space-y-4">
//         {journals.map((journal) => (
//           <JournalCard
//             key={journal._id}
//             entry={journal} // 👈 This passes the full journal data as 'entry'
//             onEdit={() => handleEdit(journal)} // Edit handler
//             onDelete={() => handleDelete(journal._id)} // Delete handler
//             onToggleComplete={handleToggleComplete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JournalPage;

import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import axios from "axios";
import { useModal } from "../context/ModalContext"; // Import modal context
import JournalCard from "../components/JournalCard";

import JournalFilterBar from "../components/JournalFilterBar";




const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { Refetch, triggerRefetch } = useModal();
  const { toggleModal, setIsEditMode, setEditingEntry } = useModal();
  const [filters, setFilters] = useState({
    title: "",
    mood: "",
    tag: "",
    jtype: "",
    dateRange: "",
  });


  /*Here we declared useeffect globally to refetch after add or edit journal, 
        we created a useState of Refetch in ModalCOntext.jsx and created a triggerRefetch function there.
        also we added triggerRefetch() in finally block That's how we made the refetch functionality work hehe!! */
  useEffect(() => {
    fetchJournals();
  }, [Refetch, filters]);


  //fetch journal filter
  const filteredJournals = journals.filter((journal) => {
    const titleMatch = journal.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());


    const tagMatch = journal.tag
      .toLowerCase()
      .includes(filters.tag.toLowerCase());
    const moodMatch = !filters.mood || journal.mood === filters.mood;
    const typeMatch = !filters.jtype || journal.jtype === filters.jtype;

    let dateMatch = true;

if (filters.dateRange) {
  const now = new Date();
  const journalDate = new Date(journal.createdAt);

  // Check valid date
  if (isNaN(journalDate.getTime())) {
    dateMatch = false; // Invalid date => exclude this journal
  } else {
    const diffInMs = now - journalDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // floor to full days difference

    switch (filters.dateRange) {
      case "1d":
        dateMatch = diffInDays <= 1;
        break;
      case "7d":
        dateMatch = diffInDays <= 7;
        break;
      case "30d":
        dateMatch = diffInDays <= 30;
        break;
      default:
        dateMatch = true;
    }
  }
}


    return titleMatch && moodMatch && tagMatch && typeMatch && dateMatch;
  });


  const fetchJournals = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await user.getIdToken();
      const query = new URLSearchParams(filters).toString();

      const response = await axios.get(`http://localhost:5000/api/journals?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load journal entries.");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (entry) => {
    setIsEditMode(true);
    setEditingEntry(entry);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await user.getIdToken();

      await axios.delete(`http://localhost:5000/api/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals((prev) => prev.filter((journal) => journal._id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed to delete journal entry.");
    }
  };

  //toggle complete refetch may occur
  const handleToggleComplete = async (journalId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.patch(
        `http://localhost:5000/api/journals/toggle-complete/${journalId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      triggerRefetch();
    } catch (err) {
      console.error("Failed to toggle journal completion:", err);
    }
  };



  return (
    <div className="p-6 bg-emerald-900 text-white min-h-screen">
      <JournalFilterBar filters={filters} setFilters={setFilters} />
      <h1 className="text-3xl font-semibold mb-6">Your Journal Entries</h1>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {filteredJournals.map((journal) => (
          <JournalCard
            key={journal._id}
            entry={journal} // 👈 This passes the full journal data as 'entry'
            onEdit={() => handleEdit(journal)} // Edit handler
            onDelete={() => handleDelete(journal._id)} // Delete handler
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalPage;

