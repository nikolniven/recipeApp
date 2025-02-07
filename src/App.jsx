import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeOverview from "./components/HomeOverview";
import RecipesList from "./pages/RecipesList";
import RecipeItem from "./pages/RecipeItem";
import RecipesTags from "./pages/RecipesTags";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomeOverview />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="/recipes/tags" element={<RecipesTags />} />
          <Route path="/recipes/:recipeID" element={<RecipeItem />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
