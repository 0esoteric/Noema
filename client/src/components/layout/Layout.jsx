import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AddEntryModal from "../journals/AddEntryModal";

const Layout = ({ isSidebarOpen, toggleSidebar, fetchJournals }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <AddEntryModal onJournalSaved={fetchJournals} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
        <main className="flex-1 mt-15 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
