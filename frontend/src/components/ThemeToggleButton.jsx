import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className={`fixed top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 transform ${theme === "dim" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-200"} focus:outline-none`}
        >
            <span
                className={`absolute text-xl transition-transform duration-300 ease-in-out ${theme === "dim" ? "translate-x-6" : "translate-x-0"}`}
            >
                🌙
            </span>
            <span
                className={`absolute text-xl transition-transform duration-300 ease-in-out ${theme === "dim" ? "translate-x-0" : "translate-x-6"}`}
            >
                🌞
            </span>
        </button>
    );
};

export default ThemeToggleButton;
