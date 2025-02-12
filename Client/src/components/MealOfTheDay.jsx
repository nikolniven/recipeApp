import { useEffect, useRef } from "react";
import { useMealContext } from "../context/MealContext";

const MealOfTheDay = () => {
  const {
    meal,
    meals,
    fetchAllMeals,
    // getRandomMealFromList,
    nextMeal,
    previousMeal,
  } = useMealContext();
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return; // Prevent double fetch
    fetched.current = true;
    fetchAllMeals();
    return () => {
      fetched.current = true; // Cleanup
    };
  }, []);

  console.log(meal);

  if (!meal)
    return (
      <p className="text-center text-gray-500">Loading Meal of the Day...</p>
    );

  // Collect ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} (${meal[`strMeasure${i}`]})`
      );
    }
  }

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center  relative z-10">
      {/* The mt-24 class adds margin-top to create space for a fixed navbar */}
      <h2 className="text-xl font-bold mb-2">
        Meal of the Day: {meal.strMeal}
      </h2>

      <div className="flex justify-center items-center mb-4 relative">
        {/* Left Button */}
        <button
          onClick={previousMeal}
          className="absolute left-0 text-white bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 z-20"
        >
          &lt; Prev
        </button>

        {/* Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="max-w-full h-80 object-contain rounded-lg z-10"
        />

        {/* Right Button */}
        <button
          onClick={nextMeal}
          className="absolute right-0 text-white bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 z-20"
        >
          Next &gt;
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">{meal.strCategory}</h3>

      <div className="text-center text-sm text-gray-600 mb-4">
        <h4 className="font-semibold mb-2">Ingredients:</h4>
        <div className="flex flex-wrap justify-center">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="mx-2 mb-2 text-center bg-gray-200 p-2 rounded-lg"
            >
              {ingredient}
            </div>
          ))}
        </div>
      </div>

      <div className="text-left text-sm text-gray-600 mb-4">
        <h4 className="font-semibold">Instructions:</h4>
        <p>{meal.strInstructions}</p>
      </div>

      <div className="mt-4">
        <a
          href={meal.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Recipe Source
        </a>
      </div>

      <div className="mt-2">
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Watch Recipe Video
        </a>
      </div>
    </div>
  );
};

export default MealOfTheDay;
