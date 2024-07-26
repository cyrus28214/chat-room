import { Message } from "../utils/types";
import MessageItem from "./MessageItem";

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (<div className='h-full'>
        {messages.map((message, index) => (
            <MessageItem key={index} message={message} />
        ))}
    </div>);
}