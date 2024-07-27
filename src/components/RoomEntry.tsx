import { useContext } from "react";
import { ChatContext } from "../utils/context";
import api from "../api/api";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function RoomEntry() {
    const roomId = useContext(ChatContext)?.roomId;
    const { data: roomListRes } = api.useRoomList();
    const { data: messageListRes } = api.useMessageList(roomId ? { roomId } : null);
    const messages = messageListRes?.messages || [];

    if (!roomId || !roomListRes) return null;
    const room = roomListRes.rooms.find(room => room.roomId === roomId);
    if (!room) return null;

    return (<div className='h-full flex flex-col'>
        <div className='h-16 px-6 shadow-md flex items-center'>
            <h2 className='text-lg font-bold ellipsis'
                title={room.roomName}>
                {room.roomName}
            </h2>
        </div>
        <div className='flex-1 overflow-y-scroll overflow-x-hidden'>
            <div className='px-6 py-4'>
                <MessageList messages={messages} />
            </div>
        </div>
        <div className='px-6 pb-6'>
            <ChatInput />
        </div>
    </div>);
}