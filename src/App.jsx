import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MealList from "./components/MealList";
import SearchMeal from "./components/SearchMeal";
import About from "./components/About";
import Navbar from "./components/Navbar";
import MealOfTheDay from "./components/MealOfTheDay";
import { MealProvider } from "./context/MealContext"; // Import MealProvider

function App() {
  return (
    <MealProvider>
      {" "}
      {/* Wrap entire app in MealProvider */}
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<MealList />} />
            <Route path="/search" element={<SearchMeal />} />
            <Route path="/meal-of-the-day" element={<MealOfTheDay />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </MealProvider>
  );
}

export default App;
