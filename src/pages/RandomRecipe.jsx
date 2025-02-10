import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesArea() {
  const { recipesRandom, fetchRecipesRandom } = useRecipeContext();

  useEffect(() => {
    fetchRecipesRandom();
  }, []);

  return <div>{JSON.stringify(recipesRandom)}</div>;
}
