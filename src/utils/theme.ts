export type Theme = "light" | "dark";
export function getSystemTheme(): Theme {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}