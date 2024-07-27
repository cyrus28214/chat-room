import { useContext, useState } from "react";
import api from "../api/api";
import { ChatContext, UserContext } from "../utils/context";
import { parseError } from "../utils/error";
import NoticeModal from "./modal/NoticeModal";

export default function ChatInput() {
    const [value, setValue] = useState("");
    const submitCls = value.trim() ? "btn-primary" : "btn-disabled";
    const messageAdd = api.useMessageAdd();
    const { roomId } = useContext(ChatContext);
    const { name } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);

    async function handleSubmit() {
        if (!roomId || !name) {
            setErrorMsg("请先加入聊天室");
            return;
        }
        try {
            await messageAdd({
                sender: name,
                roomId: roomId,
                content: value
            });
        } catch (error) {
            setErrorMsg(parseError(error));
            setShowError(true);
            return;
        }
        setValue("");
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
        <NoticeModal
            title="发送失败"
            show={showError}
            message={errorMsg}
            onClose={() => setShowError(false)} />
    </div>);
}