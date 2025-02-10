import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MealList from "./components/MealList";
import SearchMeal from "./components/SearchMeal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> {/* Homepage */}
        <Route path="/meals" element={<MealList />} /> {/* Meal List Page */}
        <Route path="/search" element={<SearchMeal />} /> {/* Search Page */}
      </Routes>
    </div>
  );
}

export default App;
