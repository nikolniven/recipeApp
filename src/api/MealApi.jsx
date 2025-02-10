// src/api/mealAPI.js
import axios from 'axios';

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMeals = async () => {
  try {
    const response = await axios.get(`${API_URL}/search.php?s=`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals", error);
    return [];
  }
};

// Example: Get meal by ID (could be part of your CRUD)
export const fetchMealById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    console.error("Error fetching meal by ID", error);
    return null;
  }
};
