import { useContext } from "react";
import { ChatContext } from "../utils/context";
import api from "../api/api";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function RoomEntry() {
    const roomId = useContext(ChatContext)?.roomId;
    const { data: messageListRes } = api.useMessageList(roomId ? { roomId } : null);
    const messages = messageListRes?.messages || [];

    return (roomId &&
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