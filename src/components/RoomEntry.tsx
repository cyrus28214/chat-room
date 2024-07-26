import { useContext } from "react";
import { ChatContext } from "../utils/context";
import api from "../api/api";
import MessageList from "./MessageList";

export default function RoomEntry() {
    const chatContext = useContext(ChatContext);
    const messageListArgs = chatContext?.roomId ? { roomId: chatContext.roomId } : null;
    const { data: messageListRes } = api.useMessageList(messageListArgs);
    const messages = messageListRes?.messages || [];
    return (<>
        <div className='h-full overflow-y-auto'>
            <div className='p-4'>
                <MessageList messages={messages} />
            </div>
        </div>
    </>);
}