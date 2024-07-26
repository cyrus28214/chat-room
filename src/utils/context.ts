import { createContext } from "react";

export const UserContext = createContext<string | undefined>(undefined);

interface ChatContextType {
    roomId: number | undefined;
    setRoomId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);