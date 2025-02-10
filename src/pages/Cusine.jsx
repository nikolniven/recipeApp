import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/common/statCard";
import RecipeAPI from "../services/RecipeAPI";

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

 useEffect(() => {
   const fetchCategories = async () => {
     const categories = await RecipeAPI.getRecipeByCategory();
     console.log(categories);
   };

   fetchCategories();
 }, []);

  ////graph
  return (
    <div>
      <header>
        <h1>Recipe App</h1>
        <div style={styles.cardContainer}>
          <StatCard
            title="ITALIAN"
            image="path/to/image.jpg"
            description="/"
            onClick={() => console.log("card clicked")}
          />

          <StatCard
            title="gERMAN"
            image="path/to/image.jpg"
            description="/"
            onClick={() => console.log("card clicked")}
          />

          <StatCard
            title="INDIAN"
            image="path/to/image.jpg"
            description="/"
            onClick={() => console.log("card clicked")}
          />
          <StatCard
            title="BRITISH"
            image="path/to/image.jpg"
            description="/"
            onClick={() => console.log("card clicked")}
          />
        </div>
        <div>DIFFICULTY</div>
      </header>
    </div>
  );
};

export default HomeOverview;
