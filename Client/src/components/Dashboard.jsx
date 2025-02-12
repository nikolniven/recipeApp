import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMealContext } from "../context/MealContext";
import { fetchMealById } from "../api/MealApi";

export default function Dashboard() {
  const [userFavourites, setUserFavourites] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5005/favourites")
      .then((resp) => {
        const promises = resp.data[0].favourite_meals.map((e) =>
          fetchMealById(e)
        );
        return axios.all(promises);
      })
      .then((resp) => setUserFavourites(resp))
      .catch((err) => console.log(err));
  }, []);

  return <div>{JSON.stringify(userFavourites)}</div>;
}
