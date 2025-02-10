import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Recipe App</h1>
      <div className="space-y-4">
        <Link
          to="/meals"
          className="block w-60 text-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          🍽️ Browse Meals
        </Link>
        <Link
          to="/search"
          className="block w-60 text-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          🔍 Search Meals
        </Link>
        <Link
          to="/about"
          className="block w-60 text-center bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600"
        >
          ℹ️ About
        </Link>
      </div>
    </div>
  );
};

export default Home;
