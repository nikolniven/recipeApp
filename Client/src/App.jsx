import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MealList from "./components/MealList";
import SearchMeal from "./components/SearchMeal";
import About from "./components/About";
import Navbar from "./components/Navbar";
import MealOfTheDay from "./components/MealOfTheDay";
import { MealProvider } from "./context/MealContext";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <ThemeProvider>
      <MealProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <div className="pt-16 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meals" element={<MealList />} />
              <Route path="/meals/:id" element={<RecipeDetail />} />
              <Route path="/search" element={<SearchMeal />} />
              <Route path="/meal-of-the-day" element={<MealOfTheDay />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </MealProvider>
    </ThemeProvider>
  );
}

export default App;
