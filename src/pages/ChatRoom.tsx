import { useState } from "react";
import { ChatContext, UserContext } from "../utils/context";
import SideBar from "../components/SideBar";
import RoomEntry from "../components/RoomEntry";

export function ChatRoom() {
    const [activeRoomId, setActiveRoomId] = useState<number | undefined>(undefined);
    return (<UserContext.Provider value='cyrus'>
        <ChatContext.Provider value={{ roomId: activeRoomId, setRoomId: setActiveRoomId }}>
            <div className='h-screen flex'>
                <div className='h-full w-56 md:w-72 lg:w-96'>
                    <SideBar />
                </div>
                <div className='h-full flex-1'>
                    <RoomEntry />
                </div>
            </div>
        </ChatContext.Provider>
    </UserContext.Provider>)
}