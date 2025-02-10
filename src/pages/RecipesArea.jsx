import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesArea() {
  const { recipesArea, fetchRecipesArea } = useRecipeContext();

  useEffect(() => {
    fetchRecipesArea();
  }, []);

  return <div>{JSON.stringify(recipesArea)}</div>;
}
