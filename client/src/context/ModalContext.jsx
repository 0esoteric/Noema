
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [Refetch, setRefetch] = useState(false);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const triggerRefetch = () => setRefetch(prev => !prev);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        toggleModal,
        editingEntry,
        setEditingEntry,
        isEditMode,
        setIsEditMode,
        openEditModal, // expose this for use in JournalPage
        Refetch,
        triggerRefetch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};



// src/context/ModalContext.jsx
// import { createContext, useState, useContext } from "react";

// const ModalContext = createContext();

// export const useModal = () => useContext(ModalContext);

// export const ModalProvider = ({ children }) => {
//   const [editingEntry, setEditingEntry] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   const toggleModal = () => setIsModalOpen(prev => !prev);

//   const openEditModal = (entry) => {
//     setEditingEntry(entry);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const openAddModal = () => {
//     setEditingEntry(null);
//     setIsEditMode(false);
//     setIsModalOpen(true);
//   };

//   return (
//     <ModalContext.Provider value={{
//       isModalOpen,
//       toggleModal,
//       editingEntry,
//       setEditingEntry,
//       isEditMode,
//       setIsEditMode,
//       openEditModal,  // ✅ expose this
//       openAddModal     // ✅ optional: for AddJournal button
//     }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };



