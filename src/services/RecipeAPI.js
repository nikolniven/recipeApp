import axios from "axios";

export default function RecipeAPI() {
  const baseURL = "https://www.themealdb.com/api/json/v1/1";

  const getAllRecipesCategories = () => {
    return axios.get(`${baseURL}/categories.php`);
  };

  const getAllRecipesIngredients = () => {
    return axios.get(`${baseURL}/filter.php?i=${inputIngredient}`);
  };

  return { getAllRecipesCategories, getAllRecipesIngredients };
}
