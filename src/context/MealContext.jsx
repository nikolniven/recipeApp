import { createContext, useContext, useState } from "react";
import { fetchMeals, getRandomMeal } from "../api/MealApi"; // Import getRandomMeal

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState(null); // Random meal
  const [mealIndex, setMealIndex] = useState(null); // Index of the current random meal

  // Fetch all meals for searching or random meal
  const fetchAllMeals = async () => {
    const mealsData = await fetchMeals();
    setMeals(mealsData);
    const randomIndex = Math.floor(Math.random() * mealsData.length); // Get random index
    const randomMeal = mealsData[randomIndex];
    setMeal(randomMeal);
    setMealIndex(randomIndex);
  };

  // Fetch a random meal
  // const getRandomMealFromList = async () => {
  //   await fetchAllMeals();
  //   const randomMeal = getRandomMeal(meals);
  //   setMeal(randomMeal);
  //   setMealIndex(meals.indexOf(randomMeal)); // Save index of the random meal
  // };

  // Fetch next random meal
  const nextMeal = () => {
    if (meals.length === 0 || mealIndex === null) return;
    const nextIndex = (mealIndex + 1) % meals.length; // Wrap around
    setMeal(meals[nextIndex]);
    setMealIndex(nextIndex);
  };

  // Fetch previous random meal
  const previousMeal = () => {
    if (meals.length === 0 || mealIndex === null) return;
    const prevIndex = (mealIndex - 1 + meals.length) % meals.length; // Wrap around
    setMeal(meals[prevIndex]);
    setMealIndex(prevIndex);
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        meal,
        fetchAllMeals,
        // getRandomMealFromList,
        nextMeal,
        previousMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
