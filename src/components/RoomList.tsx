import { RoomPreviewInfo } from "../utils/types";
import api from "../api/api";
import XmarkIcon from "../assets/icons/solid/xmark.svg?react";
import { useContext, useState } from "react";
import { RoomDeleteConfirm } from "./RoomDeleteModal";
import { ChatContext } from "../utils/context";
import Avatar from "./Avatar";
import { randomColor } from "../utils/color";

interface RoomItemProps {
    room: RoomPreviewInfo,
    onRoomDelete: () => void,
    onRoomActivate: () => void,
    cls?: string
}

// 特性：文字长度具有一定灵活性，当文字过长时，会自动省略，并显示省略号
function RoomItem({ room, onRoomDelete, onRoomActivate, cls }: RoomItemProps) {
    const msg = room.lastMessage;
    const msgStr = msg ? `${msg.sender} : ${msg.content}` : '';

    return (<div className={`flex w-full justify-between group ${cls} py-3`}
        onClick={onRoomActivate}>
        <div className="w-12 flex justify-center shrink-0">
            <Avatar color={randomColor(room.roomId.toString())} />
        </div>
        <div className='min-w-0 flex-grow flex flex-col ms-2'
            title={room.roomName + '\n' + msgStr}>
            <div className='text-base h-6 ellipsis'>{room.roomName}</div>
            <div className='opacity-60 h-5 ellipsis' > {msgStr} </div>
        </div >
        <XmarkIcon className='-me-2 fill-current btn btn-sm btn-circle btn-ghost p-1 hidden group-hover:block'
            onClick={(e) => {
                onRoomDelete();
                e.stopPropagation();
            }} />
    </div>
    );
}

export function RoomList() {
    const { data: roomListRes } = api.useRoomList();
    const [deleteTarget, setDeleteTarget] = useState<null | RoomPreviewInfo>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { roomId, setRoomId } = useContext(ChatContext);

    return (<ul className='menu h-full flex-nowrap'>
        {roomListRes?.rooms.map((room) => (
            <li key={room.roomId}>
                <RoomItem
                    room={room}
                    onRoomDelete={() => {
                        setShowDeleteModal(true);
                        setDeleteTarget(room);
                    }}
                    onRoomActivate={() => { setRoomId && setRoomId(room.roomId) }}
                    cls={room.roomId === roomId ? 'active' : ''}
                />
            </li>
        ))}
        <RoomDeleteConfirm
            show={showDeleteModal}
            room={deleteTarget!}
            onClose={() => setShowDeleteModal(false)} />
    </ul>);
}