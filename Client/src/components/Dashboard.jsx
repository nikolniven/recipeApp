import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchMealById } from "../api/MealApi";

export default function Dashboard() {
  const [userFavourites, setUserFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/favourites")
      .then((resp) => {
        const favouriteMealIds = resp.data[0]?.favourite_meals || [];
        if (favouriteMealIds.length === 0) {
          setLoading(false);
          return;
        }

        const promises = favouriteMealIds.map((mealId) =>
          fetchMealById(mealId)
        );
        return axios.all(promises);
      })
      .then((responses) => {
        if (responses) setUserFavourites(responses);
      })
      .catch(() => {
        setError("Failed to fetch favourites.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteFavourite = async (mealId) => {
    try {
      // Fetch the current favourites from json-server
      const response = await axios.get("http://localhost:5005/favourites/1");
      const favouriteMeals = response.data.favourite_meals || [];

      // Remove the mealId from the array
      const updatedMeals = favouriteMeals.filter((id) => id !== +mealId);
      // Send PUT request to update the database
      await axios.put(`http://localhost:5005/favourites/1`, {
        user_id: 1,
        favourite_meals: updatedMeals,
      });

      // Update local state to reflect changes
      setUserFavourites((prevFavourites) =>
        prevFavourites.filter((meal) => meal.idMeal !== mealId)
      );
    } catch (err) {
      console.error(
        "Error deleting favourite:",
        err.response?.data || err.message
      );
      setError("Failed to delete favourite.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Your Favourite Meals</h1>

      {userFavourites.length === 0 ? (
        <p>No favourites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userFavourites.map((meal) => (
            <div
              key={meal.idMeal}
              className="relative bg-white p-4 rounded-lg shadow-md"
            >
              <Link to={`/meals/${meal.idMeal}`} className="block">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                <p className="text-sm text-gray-500">{meal.strCategory}</p>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteFavourite(meal.idMeal)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
