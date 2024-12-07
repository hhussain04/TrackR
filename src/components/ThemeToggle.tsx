import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-opacity-20 transition-colors duration-200 ease-in-out
        hover:bg-opacity-30 dark:text-white"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 animate-spin-slow" />
      ) : (
        <Moon className="w-5 h-5 animate-spin-slow" />
      )}
    </button>
  );
};

export default ThemeToggle;