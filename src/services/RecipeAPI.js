import axios from "axios";
import React from "react";

export default function RecipeAPI() {
  const baseURL = "https://dummyjson.com";

  const getAllRecipes = () => {
    return axios.get(`${baseURL}/recipes`);
  };

  const getRecipeByID = (recipeID) => {
    return axios.get(`${baseURL}/recipes/${recipeID}`);
  };

  const getRecipesTags = () => {
    return axios.get(`${baseURL}/recipes/tags`);
  };

  return { getAllRecipes, getRecipeByID, getRecipesTags };
}
