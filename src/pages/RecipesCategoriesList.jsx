import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesCategoriesList() {
  const { recipesCategories, fetchRecipesCategoires } = useRecipeContext();

  useEffect(() => {
    fetchRecipesCategoires();
  }, []);

  return <div>{JSON.stringify(recipesCategories)}</div>;
}
