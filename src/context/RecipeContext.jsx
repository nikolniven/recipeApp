import { createContext, useContext, useEffect, useState } from "react";
import RecipeAPI from "../services/RecipeAPI";

// create context from scratch
const RecipeContext = createContext();

// create contextWrapper to wrap everything in main.jsx
export default function RecipeContextWrapper({ children }) {
  const { getAllRecipes, getRecipeByID, getRecipesTags } = RecipeAPI();
  const [recipesList, setRecipesList] = useState([]);
  const [recipeItem, setRecipeItem] = useState({});
  const [recipesTags, setRecipesTags] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRecipes()
      .then((response) => setRecipesList(response.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  async function fetchSingleRecipe(recipeID) {
    try {
      const response = await getRecipeByID(recipeID);
      setRecipeItem(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecipesTags() {
    try {
      const response = await getRecipesTags();
      setRecipesTags(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    // add the variables you want to share across your app in the value attribute
    <RecipeContext.Provider
      value={{
        recipesList,
        recipeItem,
        recipesTags,
        fetchSingleRecipe,
        fetchRecipesTags,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

// reusable function to call the context of recipe from everywhere in your app
export const useRecipeContext = () => useContext(RecipeContext);
