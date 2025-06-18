import { Link, useLocation } from "react-router-dom";
import { FaPen, FaChartPie, FaTasks, FaBook, FaCheckCircle } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { toggleModal } = useModal();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-100 text-gray-700";

  return (
    <aside
      onClick={closeSidebar}
      className={`fixed md:static top-0 md:top-0 left-0 h-[calc(100vh-64px)] md:h-screen w-60 bg-white border-r shadow-md z-40 transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Prevent closing sidebar on internal click */}
      <div
        className="h-full flex flex-col p-4 gap-4 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Add Entry Button */}
        <button
          onClick={toggleModal}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          <FaPen />
          <span>Add Entry</span> {/* 🔁 changed from "Add Journal" to "Add Entry" */}
        </button>


        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 text-base font-medium">
          <Link
            to="/journal"
            className={`flex items-center gap-3 p-3 rounded-md transition ${isActive(
              "/journal"
            )}`}
            onClick={closeSidebar}
          >
            <FaBook className="text-lg" />
            <span>Journals</span>
          </Link>

          <Link
            to="/tasks"
            className={`flex items-center gap-3 p-3 rounded-md transition ${isActive(
              "/tasks"
            )}`}
            onClick={closeSidebar}
          >
            <FaTasks className="text-lg" />
            <span>Tasks</span>
          </Link>

          <Link
            to="/insights"
            className={`flex items-center gap-3 p-3 rounded-md transition ${isActive(
              "/insights"
            )}`}
            onClick={closeSidebar}
          >
            <FaChartPie className="text-lg" />
            <span>Insights</span>
          </Link>

          <Link
            to="/completed"
            className={`flex items-center gap-3 p-3 rounded-md transition ${isActive(
              "/completed"
            )}`}
            onClick={closeSidebar}
          >
            <FaCheckCircle className="text-lg" />
            <span>Completed</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
