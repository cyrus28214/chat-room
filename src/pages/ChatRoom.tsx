import { useContext, useEffect, useState } from "react";
import { ChatContext, UserContext } from "../utils/context";
import SideBar from "../components/SideBar";
import RoomEntry from "../components/RoomEntry";
import { Navigate } from "react-router-dom";
import { useCache } from "../utils/cache";

export function ChatRoom() {
    const [roomIdCache, setRoomIdCache] = useCache("roomId", "");
    const [roomId, setRoomId] = useState(roomIdCache ? parseInt(roomIdCache) : null);
    useEffect(() => {
        setRoomIdCache(roomId ? roomId.toString() : "");
    }, [roomId, setRoomIdCache]);

    const { name } = useContext(UserContext);
    useEffect(() => {
        if (name) {
            document.title = `聊天室 - ${name}`;
        } else {
            document.title = "聊天室";
        }
    }, [name]);

    if (!name) {
        return <Navigate to="./set-name" />;
    }

    return (
        <ChatContext.Provider value={{ roomId, setRoomId }}>
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