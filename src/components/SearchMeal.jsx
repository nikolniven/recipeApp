import { useMealContext } from "../context/MealContext";

const SearchMeal = () => {
  const {
    query,
    setQuery,
    meals,
    mealsIngredient,
    loading,
    error,
    errorIngredient,
    searchMeals,
    searchByIngredient,
    currentSearchType,
    setCurrentSearchType,
  } = useMealContext();

  const handleSearch = () => {
    if (query.trim() !== "" && currentSearchType === "by-meal") {
      searchMeals(query);
    } else if (currentSearchType === "by-ingredient") {
      searchByIngredient(query);
    }
  };

  const handleChange = (e) => {
    setCurrentSearchType(e.target.value);
    setQuery(""); // Clear search when switching search type
  };

  console.log(currentSearchType);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            currentSearchType === "by-meal"
              ? "Search for meals..."
              : "Search by ingredient..."
          }
          className="p-2 border rounded"
        />
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              value="by-meal"
              checked={currentSearchType === "by-meal"}
              onChange={handleChange}
            />
            Search by Meal
          </label>
          <label>
            <input
              type="radio"
              value="by-ingredient"
              checked={currentSearchType === "by-ingredient"}
              onChange={handleChange}
            />
            Search by Ingredient
          </label>
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {errorIngredient && <div className="text-red-500">{errorIngredient}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentSearchType === "by-meal"
          ? meals?.map((meal) => (
              <div key={meal.idMeal} className="bg-white p-4 rounded shadow">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-2 font-bold">{meal.strMeal}</h2>
              </div>
            ))
          : mealsIngredient?.map((meal) => (
              <div key={meal.idMeal} className="bg-white p-4 rounded shadow">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="mt-2 font-bold">{meal.strMeal}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchMeal;
