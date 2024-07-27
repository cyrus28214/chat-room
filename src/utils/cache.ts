import { useEffect, useState } from "react";

export function useCache(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        const cachedValue = localStorage.getItem(key);
        return cachedValue || initialValue;
    });
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);
    return [value, setValue] as const;
}