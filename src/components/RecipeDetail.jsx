import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMealById } from "../api/MealApi";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchMealById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-2xl rounded-lg mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5">
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .filter(
                  (i) =>
                    recipe[`strIngredient${i}`] &&
                    recipe[`strIngredient${i}`].trim(),
                )
                .map((i) => (
                  <li key={i}>
                    {recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <p className="whitespace-pre-line">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
