import { useContext, useState } from "react";
import Modal from "./modal/Modal";
import api from "../api/api";
import { UserContext } from "../utils/context";
import { parseError } from "../utils/error";
import NoticeModal from "./modal/NoticeModal";

interface RoomAddModalProps {
    show: boolean;
    onClose: () => void;
}

export default function RoomAddModal({ show, onClose }: RoomAddModalProps) {
    const user = useContext(UserContext);
    const [roomName, setRoomName] = useState('');
    const createBtnClass = roomName.length > 0 ? 'btn-primary' : 'btn-disabled';
    const roomAdd = api.useRoomAdd();

    const [resTitle, setResTitle] = useState<string>('');
    const [resMsg, setResMsg] = useState<string>('');

    async function handleRoomAdd() {
        if (!user) {
            onClose();
            setResTitle('创建失败');
            setResMsg('请先登录');
            return;
        }
        try {
            await roomAdd({ user, roomName });
            onClose();
            setRoomName('');
            setResTitle('创建成功');
            setResMsg(`房间“${roomName}”创建成功`);
        } catch (error) {
            onClose();
            const errorStr = parseError(error);
            setResTitle('创建失败');
            setResMsg(errorStr);
        }
    }

    return (<>
        <Modal show={show} onClose={onClose}>
            <h3 className="font-bold text-lg">新建房间</h3>
            <div className='py-7 px-3 space-y-5'>
                <input
                    type="text"
                    placeholder="房间名称"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="input input-bordered input-primary w-full" />
            </div>
            <div className='pt-2 px-3 flex justify-stretch space-x-4'>
                <button className='btn btn-outline btn-primary flex-1' onClick={onClose}>取消</button>
                <button className={`btn flex-1 ${createBtnClass}`}
                    onClick={handleRoomAdd}>创建</button>
            </div>
        </Modal>
        <NoticeModal
            show={resTitle !== ''}
            title={resTitle}
            message={resMsg}
            onClose={() => {
                setResTitle('');
                setResMsg('');
            }} />
    </>);
}
