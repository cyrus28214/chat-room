import { useContext } from "react";
import { Message } from "../utils/types";
import { UserContext } from "../utils/context";

interface MessageItemProps {
    message: Message;
}

export default function MessageItem({
    message: { sender, content, time }
}: MessageItemProps) {
    const user = useContext(UserContext);
    const chatCls = user?.name === sender ? 'chat-end' : 'chat-start';
    return (
        <div className={`chat ${chatCls}`}>
            <div className="chat-header">
                {sender}<time className="ms-2 text-xs opacity-50">{new Date(time).toLocaleString()}</time>
            </div>
            <div className="chat-bubble text-wrap break-words">
                {content}
            </div>
        </div>
    );
}