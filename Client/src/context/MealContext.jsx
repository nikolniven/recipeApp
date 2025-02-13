import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  fetchMeals,
  fetchMealsByIngredient,
  fetchMealById,
} from "../api/MealApi";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState(null);
  const [mealIndex, setMealIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [currentSearchType, setCurrentSearchType] = useState("by-meal");

  // 🔥 NEW: State for favourite meals
  const [userFavourites, setUserFavourites] = useState([]);

  // 🔥 Fetch favourite meals from db.json
  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5005/favourites");
      const favouriteMealIds = response.data[0]?.favourite_meals || [];

      const mealPromises = favouriteMealIds.map((mealId) =>
        fetchMealById(mealId)
      );
      const fetchedMeals = await axios.all(mealPromises);

      setUserFavourites(fetchedMeals);
    } catch (err) {
      console.error("Error fetching favourites:", err);
      setError("Failed to fetch favourite meals");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Add a meal to favourites
  const addFavourite = async (mealId) => {
    try {
      const response = await axios.get("http://localhost:5005/favourites/1");
      const favouriteMeals = response.data.favourite_meals || [];

      // Avoid adding the same meal twice
      if (!favouriteMeals.includes(mealId)) {
        const updatedMeals = [...favouriteMeals, mealId];

        // Update favorites on the server
        await axios.put("http://localhost:5005/favourites/1", {
          user_id: 1,
          favourite_meals: updatedMeals,
        });

        // Update the state directly
        setUserFavourites((prevFavourites) => [
          ...prevFavourites,
          { idMeal: mealId }, // Adding the new favorite directly
        ]);
      }
    } catch (err) {
      console.error("Error adding favourite:", err);
      setError("Failed to add favourite.");
    }
  };

  // 🔥 Delete a meal from favourites
  const deleteFavourite = async (mealId) => {
    try {
      const response = await axios.get("http://localhost:5005/favourites/1");
      const favouriteMeals = response.data.favourite_meals || [];

      // Remove the meal from the list
      const updatedMeals = favouriteMeals.filter((id) => id !== mealId);

      // Update favorites on the server
      await axios.put("http://localhost:5005/favourites/1", {
        user_id: 1,
        favourite_meals: updatedMeals,
      });

      // Update the state directly
      setUserFavourites((prevFavourites) =>
        prevFavourites.filter((meal) => meal.idMeal !== mealId)
      );
    } catch (err) {
      console.error("Error deleting favourite:", err);
      setError("Failed to delete favourite.");
    }
  };
  // Load favourites when the app starts
  useEffect(() => {
    fetchFavourites();
  }, []);

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
        fetchAllMeals: async () => {
          const mealsData = await fetchMeals();
          setMeals(mealsData);
          const randomIndex = Math.floor(Math.random() * mealsData.length);
          setMeal(mealsData[randomIndex]);
          setMealIndex(randomIndex);
        },
        searchMeals, // Added this function here
        searchByIngredient, // Added this function here
        getRecipeById: async (id) => {
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
        },
        currentSearchType,
        setCurrentSearchType,
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
        // 🔥 Favourites functions
        userFavourites,
        fetchFavourites,
        addFavourite,
        deleteFavourite,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
