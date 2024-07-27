import { useContext } from "react";
import { Message } from "../utils/types";
import { UserContext } from "../utils/context";
import Avatar from "./Avatar";
import { randomColor } from "../utils/color";

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
            <div className="w-10 chat-image">
                <Avatar color={randomColor(sender)} />
            </div>
            <div className="chat-header">
                <div className="flex items-center">
                    <p className='shrink max-w-36 ellipsis' title={sender}>{sender}</p>
                    <time className="ms-2 text-xs opacity-50">{new Date(time).toLocaleString()}</time>
                </div>
            </div>
            <div className="chat-bubble text-wrap break-words whitespace-pre">
                {content}
            </div>
        </div>);
}