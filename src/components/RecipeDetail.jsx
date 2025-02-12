import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMealContext } from "../context/MealContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipe, loading, error, getRecipeById } = useMealContext();

  useEffect(() => {
    getRecipeById(id);
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!recipe) return <div className="p-4">Recipe not found</div>;

  // Collect ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} (${recipe[`strMeasure${i}`]})`
      );
    }
  }

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center relative z-10">
      <h2 className="text-3xl font-bold mb-4">{recipe.strMeal}</h2>

      <div className="flex justify-center items-center mb-4 relative">
        {/* Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="max-w-full h-80 object-contain rounded-lg z-10"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{recipe.strCategory}</h3>

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
        <p className="whitespace-pre-line">{recipe.strInstructions}</p>
      </div>

      <div className="mt-4">
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Recipe Source
        </a>
      </div>

      <div className="mt-2">
        <a
          href={recipe.strYoutube}
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

export default RecipeDetail;
