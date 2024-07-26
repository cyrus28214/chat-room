import { useState, useEffect } from "react";
import SunIcon from '../assets/icons/solid/sun.svg?react';
import MoonIcon from '../assets/icons/solid/moon.svg?react';
import { getSystemTheme, Theme } from "../utils/theme";



export default function ThemeToggler({ className }: { className?: string }): JSX.Element {
    const [theme, setTheme] = useState<Theme>(getSystemTheme());
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return <>
        <label className={`swap swap-rotate ${className}`}>
            <input type="checkbox" className="theme-controller" value={theme} onChange={toggleTheme} />
            <SunIcon className="swap-off size-full fill-current" />
            <MoonIcon className="swap-on size-full fill-current" />
        </label>
    </>;
}