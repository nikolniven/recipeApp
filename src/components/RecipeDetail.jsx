import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };
    fetchMealDetail();
  }, [id]);

  if (!meal) {
    return (
      <p className="text-center text-gray-500">Loading Recipe Details...</p>
    );
  }

  // Extract ingredients & measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} (${meal[`strMeasure${i}`]})`
      );
    }
  }

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{meal.strMeal}</h2>

      <div className="flex justify-center items-center mb-4 relative">
        {/* Meal Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="max-w-full h-80 object-contain rounded-lg z-10"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        {meal.strCategory}
      </h3>

      {/* Ingredients */}
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

      {/* Instructions */}
      <div className="text-left text-sm text-gray-600 mb-4">
        <h4 className="font-semibold">Instructions:</h4>
        <p>{meal.strInstructions}</p>
      </div>

      {/* Links */}
      <div className="mt-4">
        {meal.strSource && (
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mb-2"
          >
            Recipe Source
          </a>
        )}
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch Recipe Video
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
