import { createContext, useContext, useState } from "react";
import axios from "axios";
import { fetchMeals, fetchMealById } from "../api/MealApi";

// Create the MealContext
const MealContext = createContext();

// Context Provider Component
export const MealProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSearchType, setCurrentSearchType] = useState("by-meal");

  const [mealsIngredient, setMealsIngredient] = useState([]);
  const [queryIngredient, setQueryIngredient] = useState("");
  const [errorIngredient, setErrorIngredient] = useState(null);

  const [recipe, setRecipe] = useState(null);

  // Fetch meals from API
  const searchMeals = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
      );
      setMeals(response.data.meals || []);
    } catch (err) {
      setError("Error fetching meals. Please try again.");
    }
    setLoading(false);
  };

  //searchByIngredient;

  const searchByIngredient = async (searchQueryIngredient) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?i=${searchQueryIngredient}`,
      );
      setMealsIngredient(response.data.mealsIngredient);
    } catch (err) {
      setErrorIngredient(
        "Error fetching meals by ingredient 🧐. Please try again",
      );
    }
    setLoading(false);
  };

  ////moving to the context

  const getMeals = async () => {
    setLoading(true);
    try {
      const data = await fetchMeals();
      setMeals(data);
    } catch (error) {
      setError("Error fetching meals");
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (id) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const data = await fetchMealById(id);
      if (!data) {
        throw new Error("Recipe not found");
      }
      setRecipe(data);
    } catch (error) {
      setError(error.message || "Error fetching recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        mealsIngredient,
        recipe,
        loading,
        error,
        query,
        queryIngredient,
        errorIngredient,
        setQuery,
        getMeals,
        getRecipeById,
        searchMeals,
        currentSearchType,
        setCurrentSearchType,
        setQueryIngredient,
        setErrorIngredient,
        searchByIngredient,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to use the context
export const useMealContext = () => useContext(MealContext);
