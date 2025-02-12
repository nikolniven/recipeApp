import { createContext, useContext, useState } from "react";
import {
  fetchMeals,
  fetchMealsByIngredient,
  fetchMealById,
} from "../api/MealApi"; // Import the fetch function for ingredients

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState(null); // Random meal
  const [mealIndex, setMealIndex] = useState(null); // Index of the current random meal
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null); // Add recipe state
  const [currentSearchType, setCurrentSearchType] = useState("by-meal"); // Default to "by-meal"

  // Search meals by name
  const searchMeals = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchMeals(query); // Pass query to fetchMeals
      setMeals(response);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  // Search meals by ingredient
  const searchByIngredient = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchMealsByIngredient(query);
      setMeals(response);
    } catch (err) {
      console.error("Error fetching meals by ingredient:", err);
      setError("Failed to fetch meals by ingredient");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random meal
  const fetchAllMeals = async () => {
    const mealsData = await fetchMeals();
    setMeals(mealsData);
    const randomIndex = Math.floor(Math.random() * mealsData.length);
    const randomMeal = mealsData[randomIndex];
    setMeal(randomMeal);
    setMealIndex(randomIndex);
  };

  // Fetch a recipe by ID
  const getRecipeById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const recipeData = await fetchMealById(id);
      setRecipe(recipeData);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setError("Failed to fetch recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        meal,
        recipe,
        query,
        setQuery,
        loading,
        error,
        fetchAllMeals,
        searchMeals,
        searchByIngredient, // Provide searchByIngredient
        getRecipeById,
        currentSearchType,
        setCurrentSearchType, // Provide setter function for currentSearchType
        nextMeal: () => {
          if (meals.length === 0 || mealIndex === null) return;
          const nextIndex = (mealIndex + 1) % meals.length;
          setMeal(meals[nextIndex]);
          setMealIndex(nextIndex);
        },
        previousMeal: () => {
          if (meals.length === 0 || mealIndex === null) return;
          const prevIndex = (mealIndex - 1 + meals.length) % meals.length;
          setMeal(meals[prevIndex]);
          setMealIndex(prevIndex);
        },
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
