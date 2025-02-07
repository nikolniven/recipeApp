import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useParams } from "react-router-dom";

export default function RecipeItem() {
  const { recipeID } = useParams();
  const { recipeItem, fetchSingleRecipe } = useRecipeContext();
  console.log(recipeItem);

  useEffect(() => {
    fetchSingleRecipe(recipeID);
  }, []);

  return <div>{JSON.stringify(recipeItem)}</div>;
}
