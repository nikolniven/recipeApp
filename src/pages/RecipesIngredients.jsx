import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import StatCard from "../components/common/statCard";

export default function RecipesIngredients() {
  const { recipesIngredients, fetchRecipesIngredients } = useRecipeContext();

  useEffect(() => {
    fetchRecipesIngredients();
  }, []);

  return (
    <div>
      {recipesIngredients
        .filter((i) => i.strDescription) // Remove empty descriptions
        .map((ingredient) => (
          <StatCard
            key={ingredient.idIngredient}
            title={ingredient.strIngredient}
            image={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
            description={ingredient.strDescription}
          />
        ))}
    </div>
  );
}
