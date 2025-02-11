// src/components/MealList.jsx
import { useState, useEffect } from "react";
import { fetchMeals } from "../api/MealApi";
import { useNavigate } from "react-router-dom";

const MealList = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const data = await fetchMeals();
      setMeals(data);
    };
    getMeals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meal List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals?.map((meal) => (
          <div key={meal.idMeal} className="bg-white p-4 rounded-lg shadow-md">
            <img
              onClick={() => navigate(`/meals/${meal.idMeal}`)}
              style={{ cursor: "pointer" }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
            <p className="text-sm text-gray-500">{meal.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
