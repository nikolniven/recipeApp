import { useMealContext } from "../context/MealContext";

const SearchMeal = () => {
  const { query, setQuery, meals, loading, error, searchMeals } =
    useMealContext();

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchMeals(query); // Trigger the search only if query is non-empty
    }
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
