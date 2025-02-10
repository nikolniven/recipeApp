import axios from "axios";

export default function RecipeAPI() {
  const baseURL = "https://www.themealdb.com/api/json/v1/1";

  //type of food breakfast beef
  const getAllRecipesCategories = () => {
    return axios.get(`${baseURL}/categories.php`);
  };

  //makes actual sense beef salmon etc
  const getAllRecipesIngredients = () => {
    return axios.get(`${baseURL}/list.php?i=list`);
  };

  //search by area on our planet
  const getAllRecipesArea = () => {
    return axios.get(`${baseURL}/list.php?a=list`);
  };

  //search random recepie
  const getRandomRecipie = () => {
    return axios.get(`${baseURL}/random.php`);
  };

  return {
    getAllRecipesCategories,
    getAllRecipesIngredients,
    getAllRecipesArea,
    getRandomRecipie,
  };
}
