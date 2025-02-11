import { createContext, useContext, useState } from "react";
import axios from "axios";
import { fetchMeals, fetchMealById } from "../api/MealApi";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  // Search states
  const [query, setQuery] = useState("");
  const [currentSearchType, setCurrentSearchType] = useState("by-meal");

  // Data states
  const [meals, setMeals] = useState([]);
  const [mealsIngredient, setMealsIngredient] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorIngredient, setErrorIngredient] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  const searchByIngredient = async (searchQueryIngredient) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQueryIngredient}`,
      );
      setMealsIngredient(response.data.meals || []);
    } catch (err) {
      setErrorIngredient("Error fetching meals by ingredient");
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (id) => {
    setLoading(true);
    setError(null);
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
        // States
        query,
        meals,
        mealsIngredient,
        recipe,
        loading,
        error,
        errorIngredient,
        currentSearchType,

        // Setters
        setQuery,
        setCurrentSearchType,
        setErrorIngredient,

        // Actions
        searchMeals,
        searchByIngredient,
        getRecipeById,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMealContext must be used within a MealProvider");
  }
  return context;
};
