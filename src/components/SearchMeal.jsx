import { useSearchParams } from "react-router-dom";
import { useMealContext } from "../context/MealContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const mealQuery = searchParams.get("meal");
  const ingredientQuery = searchParams.get("ingredient");

  useEffect(() => {
    if (mealQuery) {
      setQuery(mealQuery);
      searchMeals(mealQuery);
    } else if (ingredientQuery) {
      setQuery(ingredientQuery);
      searchByIngredient(ingredientQuery);
    }
  }, [mealQuery, ingredientQuery]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      if (currentSearchType === "by-meal") {
        searchMeals(query);
        setSearchParams({ meal: query }); // Update URL with meal query
      } else {
        searchByIngredient(query);
        setSearchParams({ ingredient: query });
      }
    }
  };

  const handleChange = (e) => {
    setCurrentSearchType(e.target.value);
    setQuery("");
  };

  console.log(mealsIngredient);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center space-x-4">
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
                className="mr-1"
              />
              Search by Meal
            </label>
            <label>
              <input
                type="radio"
                value="by-ingredient"
                checked={currentSearchType === "by-ingredient"}
                onChange={handleChange}
                className="mr-1"
              />
              Search by Ingredient
            </label>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {errorIngredient && (
          <div className="text-red-500 text-center">{errorIngredient}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal) => {
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              if (meal[`strIngredient${i}`]) {
                ingredients.push(
                  `${meal[`strIngredient${i}`]} (${meal[`strMeasure${i}`]})`,
                );
              }
            }

            return (
              <Link
                to={`/meals/${meal.idMeal}`}
                key={meal.idMeal}
                className="bg-white p-4 rounded shadow"
              >
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                  <p className="text-sm text-gray-500">{meal.strCategory}</p>

                  {/* Ingredients */}
                  <div className="mt-2 text-sm">
                    <h3 className="font-semibold mb-1">Ingredients:</h3>
                    <div className="flex flex-wrap gap-1">
                      {ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 px-2 py-1 rounded-md text-xs"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchMeal;
