import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RecipeContextWrapper from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeContextWrapper>
        <App />
      </RecipeContextWrapper>
    </BrowserRouter>
  </StrictMode>,
);
