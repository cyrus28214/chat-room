import { useContext, useState } from "react";
import api from "../api/api";
import { UserContext } from "../utils/context";
import ConfirmModal from "./modal/ConfirmModal";
import NoticeModal from "./modal/NoticeModal";
import { parseError } from "../utils/error";
import { RoomPreviewInfo } from "../utils/types";

interface RoomDeleteConfirmProps {
    show: boolean,
    room: RoomPreviewInfo,
    onClose: () => void
}
export function RoomDeleteConfirm({ show, room, onClose }: RoomDeleteConfirmProps) {
    const roomDelete = api.useRoomDelete();
    const user = useContext(UserContext);

    const [resTitle, setResTitle] = useState<string>('');
    const [resMsg, setResMsg] = useState<string>('');

    async function handleConfirm() {
        if (!user) {
            onClose();
            setResTitle('删除失败');
            setResMsg('请先登录');
            return;
        }
        try {
            await roomDelete({ user, roomId: room.roomId });
            onClose();
            setResTitle('删除成功');
            setResMsg(`房间“${room.roomName}”删除成功`);
        } catch (error) {
            onClose();
            setResTitle('删除失败');
            const errorStr = parseError(error);
            if (errorStr.includes('(code: 2)')) {
                setResMsg('你没有权限删除该房间');
            } else {
                setResMsg(errorStr);
            }
        }
    }
    return (<>
        <ConfirmModal
            title='删除房间'
            message='确认删除该房间吗？'
            show={show}
            onCancel={onClose}
            onConfirm={handleConfirm} />
        <NoticeModal
            title={resTitle}
            message={resMsg}
            show={resMsg !== ''}
            onClose={() => { setResMsg(''); setResTitle('') }} />
    </>);
}

interface RoomDeleteInvalidUserProps {
    show: boolean;
    onClose: () => void;
}
export function RoomDeleteInvalidUser({ show, onClose }: RoomDeleteInvalidUserProps) {
    return (<NoticeModal
        title='删除失败'
        message='你没有权限删除该房间'
        show={show}
        onClose={onClose}
    />)
}