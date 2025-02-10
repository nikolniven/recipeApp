import { createContext, useContext, useEffect, useState } from "react";
import RecipeAPI from "../services/RecipeAPI";

// create context from scratch
const RecipeContext = createContext();

// create contextWrapper to wrap everything in main.jsx
export default function RecipeContextWrapper({ children }) {
  const { getAllRecipesCategories } = RecipeAPI();

  const [recipesCategories, setRecipesCategories] = useState([]);
  const [recipesIngredients, setRecipesIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipesCategoires = async () => {
    try {
      setIsLoading(true);
      const response = await getAllRecipesCategories();
      setRecipesCategories(response.data.categories);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecipesIngredients = async () => {
    try {
      setRecipesIngredients = await getAllRecipesIngredients();
      setRecipesIngredients(response.data.meals);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // add the variables you want to share across your app in the value attribute
    <RecipeContext.Provider
      value={{
        recipesCategories,
        recipesIngredients,
        fetchRecipesCategoires,
        fetchRecipesIngredients,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

// reusable function to call the context of recipe from everywhere in your app
export const useRecipeContext = () => useContext(RecipeContext);
