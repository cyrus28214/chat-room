import { Message } from "../utils/types";

interface MessageItemProps {
    message: Message;
}

export default function MessageItem({
    message: { sender, content, time }
}: MessageItemProps) {
    return (
        <div className="chat chat-start">
            <div className="chat-header">
                {sender}<time className="ms-2 text-xs opacity-50">{new Date(time).toLocaleString()}</time>
            </div>
            <div className="chat-bubble">
                {content}
            </div>
        </div>
    );
}