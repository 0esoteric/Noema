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
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-4 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger icon for mobile */}
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-primary focus:outline-none md:hidden"
        >
          <FaBars />
        </button>

        {/* Logo + title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-18" />
          <h1 className="text-xl font-semibold text-primary">Noema</h1>
        </div>
      </div>

      {/* Right: Clock + Profile */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-primary text-xl p-2 rounded-md">
          <FaClock />
        </button>

        <div className="relative group">
          <button
            tabIndex={0}
            className="text-gray-700 hover:text-primary text-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaUserCircle />
          </button>
          <ul
            tabIndex={0}
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden group-focus-within:block group-hover:block"
          >
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 font-semibold"
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
