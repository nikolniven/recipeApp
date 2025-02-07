import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesTags() {
  const { fetchRecipesTags, recipesTags } = useRecipeContext();

  useEffect(() => {
    fetchRecipesTags();
  }, []);

  return <div>{JSON.stringify(recipesTags)}</div>;
}
