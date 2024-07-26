import { createContext } from "react";

interface UserContextType {
    name: string | undefined;
    setName: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const UserContext = createContext<UserContextType | null>(null);

interface ChatContextType {
    roomId: number | undefined;
    setRoomId: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export const ChatContext = createContext<ChatContextType | null>(null);

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType>({ theme: "light", setTheme: () => { } });