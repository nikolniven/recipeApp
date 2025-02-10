import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the MealContext
const MealContext = createContext();

// Context Provider Component
export const MealProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch meals from API
  const searchMeals = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      setMeals(response.data.meals || []);
    } catch (err) {
      setError("Error fetching meals. Please try again.");
    }
    setLoading(false);
  };

  return (
    <MealContext.Provider
      value={{
        query,
        setQuery,
        meals,
        loading,
        error,
        searchMeals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to use the context
export const useMealContext = () => useContext(MealContext);
