import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Icons for light & dark mode

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
    >
      {theme === "light" ? (
        <Moon className="text-gray-800" />
      ) : (
        <Sun className="text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
