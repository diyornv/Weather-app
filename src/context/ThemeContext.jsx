import React, { createContext, useContext, useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeContext = createContext();

const themes = {
  light: {
    bg: "#f8f9fa",
    text: "#212529",
    accent: "#0d6efd",
  },
  dark: {
    bg: "#212529",
    text: "#f8f9fa",
    accent: "#0d6efd",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors: themes[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#212529] text-[#0d6efd] hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      aria-label="Switch theme"
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
}
