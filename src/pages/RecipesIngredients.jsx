import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesIngredients() {
  const { recipesIngredients, fetchRecipesIngredients } = useRecipeContext();

  useEffect(() => {
    fetchRecipesIngredients();
  }, []);

  return (
    <div>
      {recipesIngredients && recipesIngredients.length > 0 ? (
        <ul>
          {recipesIngredients
            .filter((ingredient) => ingredient.strDescription) // Filters out items with null descriptions
            .map((ingredient) => (
              <li key={ingredient.idIngredient}>
                <strong>{ingredient.strIngredient}</strong>:{" "}
                {ingredient.strDescription}
              </li>
            ))}
        </ul>
      ) : (
        <p>Loading ingredients...</p>
      )}
    </div>
  );
}
