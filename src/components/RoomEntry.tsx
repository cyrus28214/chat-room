import { useContext } from "react";
import { ChatContext } from "../utils/context";

export default function RoomEntry() {
    const chatContext = useContext(ChatContext);
    return (<div>
        Current Room:
        {chatContext?.roomId}
    </div>);
}