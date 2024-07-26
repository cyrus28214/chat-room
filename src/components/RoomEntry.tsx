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

    const roomIdValid = roomId && roomListRes?.rooms.some(room => room.roomId === roomId);

    return (roomIdValid &&
        <div className='h-full flex flex-col'>
            <div className='flex-1 overflow-y-scroll'>
                <div className='px-6 py-4'>
                    <MessageList messages={messages} />
                </div>
            </div>
            <div className='px-6 pb-6'>
                <ChatInput />
            </div>
        </div>);
}