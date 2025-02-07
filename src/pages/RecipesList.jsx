import { useRecipeContext } from "../context/RecipeContext";

export default function RecipesList() {
  const { recipesList } = useRecipeContext();
  return <div>{JSON.stringify(recipesList)}</div>;
}
