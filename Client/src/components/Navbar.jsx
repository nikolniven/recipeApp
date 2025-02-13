import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 fixed w-full top-0 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
        🍽️ Recipe App
      </Link>
      <div className="flex space-x-4 items-center">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          🏠 Home
        </Link>
        <button
          onClick={() => navigate(-1)} // Go Back Button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
        >
          🔙 Back
        </button>
        <ThemeToggle /> {/* Add ThemeToggle button here */}
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Made with ❤️, our teacher Omar Dieh, and GPT 😊
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
