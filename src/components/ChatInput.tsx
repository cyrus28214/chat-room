import { useContext, useState } from "react";
import api from "../api/api";
import { ChatContext, UserContext } from "../utils/context";

export default function ChatInput() {
    const [value, setValue] = useState("");
    const submitCls = value.trim() ? "btn-primary" : "btn-disabled";
    const messageAdd = api.useMessageAdd();

    const roomId = useContext(ChatContext)?.roomId;
    const user = useContext(UserContext)!;

    async function handleSubmit() {
        if (roomId && user?.name) {
            await messageAdd({
                sender: user.name,
                roomId: roomId,
                content: value
            });
            setValue("");
        }
    }

    return (<div className='flex space-x-4 items-end'>
        <textarea className='
            [field-sizing:content] [resize:none]
            textarea textarea-bordered
            flex-1 w-full overflow-y-auto max-h-64'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <button className={`btn btn-primary ${submitCls}`}
            onClick={handleSubmit}
        >发送</button>
    </div>);
}