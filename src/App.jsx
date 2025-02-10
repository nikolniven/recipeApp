import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeOverview from "./components/HomeOverview";
import RecipesList from "./pages/RecipesList";
import RecipeItem from "./pages/RecipeItem";
import RecipesCategoriesList from "./pages/RecipesCategoriesList";
import RecipesIngredients from "./pages/RecipesIngredients";
import RecipesArea from "./pages/RecipesArea";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/recipes/ingredients" element={<RecipesIngredients />} />
          <Route path="/" element={<HomeOverview />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route
            path="/recipes/categories"
            element={<RecipesCategoriesList />}
          />
          <Route path="/recipes/area" element={<RecipesArea />} />
          {/* <Route path="/recipes/:recipeID" element={<RecipeItem />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
