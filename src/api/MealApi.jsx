import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

// Fetch all meals for searching or random selection
export const fetchMeals = async () => {
  try {
    const response = await axios.get(`${API_URL}/search.php?s=`); // Get all meals
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals", error);
    return [];
  }
};

// Fetch a single meal by its ID
export const fetchMealById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals[0] || null; // Return the meal or null if not found
  } catch (error) {
    console.error("Error fetching meal by ID", error);
    return null;
  }
};

// Helper function to get a random meal from the fetched meals
export const getRandomMeal = (meals) => {
  if (meals.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * meals.length); // Get random index
  return meals[randomIndex];
};
