import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("luxury"); // default fallback

    // On mount: load theme from localStorage or <html data-theme="">
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const currentTheme = storedTheme || document.documentElement.getAttribute("data-theme") || "luxury";
        setTheme(currentTheme);
        document.documentElement.setAttribute("data-theme", currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "caramellatte" ? "luxury" : "caramellatte";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="flex gap-2 items-center">
            <label className="swap swap-rotate ml-3 md:p-2 p-1 rounded-full bg-secondary text-white hover:bg-primary-focus cursor-pointer transition duration-200">
                <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === "luxury"}
                />
                {/* Sun icon (Light mode) */}
                <svg
                    className="swap-off w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M5.64 17.66L4.22 19.07a1 1 0 001.42 1.42l1.41-1.41a1 1 0 10-1.41-1.42zM1 13h2a1 1 0 100-2H1a1 1 0 000 2zm10-9a1 1 0 00-1 1v2a1 1 0 102 0V5a1 1 0 00-1-1zm9 9h2a1 1 0 100-2h-2a1 1 0 100 2zm-2.05-7.36a1 1 0 00-1.42-1.42L17.66 5.64a1 1 0 001.42 1.42l-1.41-1.42zM12 7a5 5 0 100 10 5 5 0 000-10zm0 16a1 1 0 001-1v-2a1 1 0 10-2 0v2a1 1 0 001 1zm5.66-3.66l1.41 1.41a1 1 0 001.42-1.42l-1.41-1.41a1 1 0 00-1.42 1.42z" />
                </svg>
                {/* Moon icon (Dark mode) */}
                <svg
                    className="swap-on w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2 1 1 0 00-1.33-1.13A10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
                </svg>
            </label>
        </div>
    );
};

export default ThemeToggle;
