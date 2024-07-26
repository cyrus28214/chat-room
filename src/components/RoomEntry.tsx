import { useContext } from "react";
import { ChatContext } from "../utils/context";
import api from "../api/api";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function RoomEntry() {
    const chatContext = useContext(ChatContext);
    const messageListArgs = chatContext?.roomId ? { roomId: chatContext.roomId } : null;
    const { data: messageListRes } = api.useMessageList(messageListArgs);
    const messages = messageListRes?.messages || [];
    return (<>
        <div className='h-full flex flex-col'>
            <div className='flex-1 overflow-y-scroll'>
                <div className='px-6 py-4'>
                    <MessageList messages={messages} />
                </div>
            </div>
            <div className='px-6 pb-6 flex items-end space-x-4'>
                <ChatInput cls='overflow-y-auto max-h-64 flex-1' />
                <button className='btn btn-primary'>发送</button>
            </div>
        </div>
    </>);
}