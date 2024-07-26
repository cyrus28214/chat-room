import { RoomPreviewInfo } from "../utils/types";
import api from "../api/api";

interface RoomItemProps {
    room: RoomPreviewInfo
}
function RoomItem({ room }: RoomItemProps) {
    const msg = room.lastMessage;
    const msgStr = msg ? `${msg.sender} : ${msg.content}` : '';
    return (<div className='flex flex-col items-stretch gap-0 text-ellipsis w-full overflow-hidden text-nowrap'
        title={room.roomName + '\n' + msgStr}
    >
        <div className='text-base h-6'>{room.roomName}</div>
        <div className='opacity-60 h-5' > {msgStr} </div>
    </div>);
}

export function RoomList() {
    const { data } = api.useRoomList();
    return (<ul className='menu h-full flex-nowrap'>{
        data?.rooms.map((room) => (<li key={room.roomId}><RoomItem room={room} /></li>))
    }</ul>);
}