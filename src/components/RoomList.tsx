import { RoomPreviewInfo } from "../utils/types";
import api from "../api/api";
import XmarkIcon from "../assets/icons/solid/xmark.svg?react";
import { useState } from "react";
import { RoomDeleteConfirm } from "./RoomDeleteModal";

interface RoomItemProps {
    room: RoomPreviewInfo,
    onRoomDelete: () => void
}
function RoomItem({ room, onRoomDelete }: RoomItemProps) {
    const msg = room.lastMessage;
    const msgStr = msg ? `${msg.sender} : ${msg.content}` : '';

    return (<div className='flex w-full justify-between group'>
        <div className='min-w-0 flex-growflex flex-col items-stretch gap-0'
            title={room.roomName + '\n' + msgStr}
        >
            <div className='text-base h-6 ellipsis'>{room.roomName}</div>
            <div className='opacity-60 h-5 ellipsis' > {msgStr} </div>

        </div >
        <XmarkIcon className='-me-2 fill-current btn btn-sm btn-circle btn-ghost p-1 hidden group-hover:block'
            onClick={onRoomDelete} />
    </div>
    );
}

export function RoomList() {
    const { data: roomList } = api.useRoomList();
    const [deleteTarget, setDeleteTarget] = useState<null | RoomPreviewInfo>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (<ul className='menu h-full flex-nowrap'>
        {roomList?.rooms.map((room) => (
            <li key={room.roomId}>
                <RoomItem
                    room={room}
                    onRoomDelete={() => {
                        setShowDeleteModal(true);
                        setDeleteTarget(room);
                    }}
                />
            </li>
        ))}
        <RoomDeleteConfirm
            show={showDeleteModal}
            room={deleteTarget!}
            onClose={() => setShowDeleteModal(false)} />
    </ul>);
}