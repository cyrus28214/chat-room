import { useContext, useEffect, useState } from "react";
import { ChatContext, UserContext } from "../utils/context";
import SideBar from "../components/SideBar";
import RoomEntry from "../components/RoomEntry";
import { Navigate } from "react-router-dom";

export function ChatRoom() {
    const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

    const user = useContext(UserContext);
    useEffect(() => {
        if (user?.name) {
            document.title = `聊天室 - ${user.name}`;
        } else {
            document.title = "聊天室";
        }
    }, [user?.name]);

    if (!user?.name) {
        return <Navigate to="/set-name" />;
    }

    return (
        <ChatContext.Provider value={{ roomId: activeRoomId, setRoomId: setActiveRoomId }}>
            <div className='h-screen flex'>
                <div className='h-full w-56 md:w-72 lg:w-96'>
                    <SideBar />
                </div>
                <div className='h-full flex-1'>
                    <RoomEntry />
                </div>
            </div>
        </ChatContext.Provider>);
}