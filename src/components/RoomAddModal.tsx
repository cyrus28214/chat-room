import { useState } from "react";
import Modal from "./Modal";
import api from "../api/api";

interface RoomAddModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function RoomAddModal({ visible, onClose }: RoomAddModalProps) {
    const [user, setUser] = useState('');
    const [roomName, setRoomName] = useState('');
    const createBtnClass = user.length > 0 && roomName.length > 0 ? 'btn-primary' : 'btn-disabled';
    const roomAdd = api.useRoomAdd();

    return <Modal title='新建房间' visible={visible} onClose={onClose}>
        <div className='py-7 px-3 space-y-5'>
            <input
                type="text"
                placeholder="用户名"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="input input-bordered input-primary w-full" />
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
                onClick={async () => {
                    await roomAdd({ user, roomName });
                    setUser('');
                    setRoomName('');
                    onClose();
                }}>创建</button>
        </div>
    </Modal>;
}
