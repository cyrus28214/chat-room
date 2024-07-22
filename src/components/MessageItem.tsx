interface MessageItemProps {
    position?: "start" | "end";
    message: string;
}

export default function MessageItem(props: MessageItemProps) {
    const positionClass = props.position === "end" ? "chat-end" : "chat-start";
    return (
        <div className={`chat ${positionClass}`}>
            <div className="chat-bubble whitespace-pre-line">
                {props.message}
            </div>
        </div>
    );
}