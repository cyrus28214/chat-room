import { RoomPreviewInfo } from "../utils/types";
import api from "../api/api";

interface RoomItemProps {
    room: RoomPreviewInfo
}
function RoomItem({ room }: RoomItemProps) {
    return (<div className='card'>
        {room.roomName}
    </div>);
}

export function RoomList() {
    const { data } = api.useRoomList();
    return (<ul className='menu bg-base-200 rounded-box h-full overflow-auto flex-nowrap'>{
        data?.rooms.map((room) => (<li key={room.roomId}><RoomItem room={room} /></li>))
    }</ul>);
}