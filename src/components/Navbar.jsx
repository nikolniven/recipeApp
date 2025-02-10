import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🍽️ Recipe App
      </Link>
      <div className="space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
