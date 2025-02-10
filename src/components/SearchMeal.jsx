// src/components/SearchMeal.jsx
import { useState } from "react";
import axios from "axios";

const SearchMeal = () => {
  const [query, setQuery] = useState("");  // Stores the search query
  const [meals, setMeals] = useState([]);  // Stores the search results
  const [loading, setLoading] = useState(false);  // Tracks the loading state
  const [error, setError] = useState(null);  // Tracks any error during the fetch

  const handleSearch = async () => {
    setLoading(true);  // Start loading
    setError(null);  // Clear previous errors
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setMeals(response.data.meals || []);  // Update state with the search results
    } catch (err) {
      setError("Error fetching meals. Please try again.");
    }
    setLoading(false);  // Stop loading
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for Meals</h1>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter meal name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals?.map((meal) => (
          <div key={meal.idMeal} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
            <p className="text-sm text-gray-500">{meal.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMeal;
