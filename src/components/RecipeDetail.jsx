import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMealContext } from "../context/MealContext";

const RecipeDetail = () => {
  const { id } = useParams();
  //   const [recipe, setRecipe] = useState(null);
  //   const [loading, setLoading] = useState(true);
  const { recipe, loading, error, getRecipeById } = useMealContext();

  useEffect(() => {
    getRecipeById(id);
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!recipe) return <div className="p-4">Recipe not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-lg rounded-lg mb-6 mx-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="pl-6 space-y-2">
              {Array.from({ length: 20 }, (_, i) => i + 1) // Create an array [1, 2, ..., 20]
                .filter(
                  (i) =>
                    recipe[`strIngredient${i}`] &&
                    recipe[`strIngredient${i}`].trim(), // Keep only non-empty ingredients
                )
                .map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>🥄</span>
                    <span>
                      {recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <div>
              <p className="whitespace-pre-line">{recipe.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
      detailView
    </div>
  );
};

export default RecipeDetail;
