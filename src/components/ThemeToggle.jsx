import { useTheme } from "./ThemeContext";
import "./ThemeToggle.css"; // Import your CSS file for styling

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
