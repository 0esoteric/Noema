import { FaBars, FaClock, FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-gray-200 shadow-lg flex items-center justify-between px-4 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-300 hover:text-teal-400 focus:outline-none md:hidden"
        >
          <FaBars />
        </button>

        {/* Logo + title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-md" />
          <h1 className="text-xl font-semibold text-teal-400">Noema</h1>
        </div>
      </div>

      {/* Right: Clock + Profile */}
      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-teal-400 text-xl p-2 rounded-md">
          <FaClock />
        </button>

        <div className="relative group">
          <button
            tabIndex={0}
            className="text-gray-300 hover:text-teal-400 text-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <FaUserCircle />
          </button>
          <ul
            tabIndex={0}
            className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-xl py-2 hidden group-focus-within:block group-hover:block"
          >
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-red-400 hover:bg-red-900 hover:text-white transition font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
