import { RoomList } from "./RoomList";
import RoomToolBar from "./RoomToolBar";

export default function SideBar() {
    return (<div className='flex flex-col h-full bg-base-200'>
        <div className='flex-1 overflow-y-auto'>
            <RoomList />
        </div>
        <RoomToolBar />
    </div>);
}