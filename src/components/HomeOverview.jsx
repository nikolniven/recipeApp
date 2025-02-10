import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/common/statCard";
import { useNavigate } from "react-router-dom";

const HomeOverview = () => {
  const styles = {
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)", // Creates exactly 2 columns
      gap: "0px",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
  };

  const [myRecipeData, setMyRecipeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const MYAPIURL = "www.themealdb.com/api/json/v1/1/list.php?c=l";
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
        <div style={styles.cardContainer}>
          <StatCard
            title="CUSINE"
            image="path/to/image.jpg"
            description="/"
            onClick={() => console.log("card clicked")}
          />

          <StatCard
            title="INGREDIENTS"
            image="path/to/image.jpg"
            description="/"
            onClick={() => navigate("/recipes/ingredients")}
          />

          <StatCard
            title="CATHEGORY"
            image="path/to/image.jpg"
            description="/"
            onClick={() => navigate("/recipes/categories")}
          />
          <StatCard
            title="RANDOM RECIPE"
            image="path/to/image.jpg"
            description="/"
            onClick={() => navigate("/recipes/todaysrecipe")}
          />
        </div>
        <div>DIFFICULTY</div>
      </header>
    </div>
  );
};

export default HomeOverview;
