import { RoomList } from "./RoomList";
import ToolBar from "./ToolBar";

export default function SideBar() {
    return (<div className='flex flex-col h-full bg-base-200'>
        <div className='flex-1 overflow-y-auto'>
            <RoomList />
        </div>
        <ToolBar />
    </div>);
}