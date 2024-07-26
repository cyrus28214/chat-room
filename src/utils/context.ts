import { createContext } from "react";

interface UserContextType {
    name: string;
    setName?: React.Dispatch<React.SetStateAction<string>>;
}
export const UserContext = createContext<UserContextType>({ name: "" });

interface ChatContextType {
    roomId: number | null;
    setRoomId?: React.Dispatch<React.SetStateAction<number | null>>;
}
export const ChatContext = createContext<ChatContextType>({ roomId: null });

interface ThemeContextType {
    theme: string;
    setTheme?: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType>({ theme: "light" });