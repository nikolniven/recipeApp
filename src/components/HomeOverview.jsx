import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeOverview = () => {
  const [myRecipeData, setMyRecipeData] = useState([]);

  useEffect(() => {
    const MYAPIURL = "https://dummyjson.com/recipes";
    axios
      .get(MYAPIURL)
      .then((response) => {
        setMyRecipeData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  ////graph
  return (
    <div>
      <header>
        <h1>Recipe App</h1>
        <p>blaaa</p>
        <div>INGREDIENTS</div>
        <div>TIME</div>
        <div>COUSINE</div>
        <div>DIFFICULTY</div>
      </header>
    </div>
  );
};

export default HomeOverview;
