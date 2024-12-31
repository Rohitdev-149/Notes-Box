import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Book icon as an SVG component
const BookIcon = () => (
  <svg
    className="w-8 h-8 inline-block mr-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

// Sun icon for light mode
const SunIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

function NavBar() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial state from localStorage
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="w-screen bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg fixed top-0 left-0 z-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-gray-200 flex items-center
          ml-[-1px]"
        >
          <BookIcon />
          Notes-Box
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Add New
          </Link>
          <Link
            to="/pastes"
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            My Notes
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
