import { useContext } from "react";
import SunIcon from '../assets/icons/solid/sun.svg?react';
import MoonIcon from '../assets/icons/solid/moon.svg?react';
import { ThemeContext } from "../utils/context";



export default function ThemeToggler({ className }: { className?: string }): JSX.Element {
    const themeCtx = useContext(ThemeContext);
    const toggleTheme = () => {
        themeCtx.setTheme(themeCtx.theme === "light" ? "dark" : "light");
    }

    return <>
        <label className={`swap swap-rotate ${className}`}>
            <input type="checkbox" className="theme-controller" value={themeCtx.theme} onChange={toggleTheme} />
            <SunIcon className="swap-off size-full fill-current" />
            <MoonIcon className="swap-on size-full fill-current" />
        </label>
    </>;
}