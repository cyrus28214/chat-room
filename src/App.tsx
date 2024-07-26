import { useState } from 'react';
import RoomEntry from './components/RoomEntry';
import SideBar from './components/SideBar';
import { ChatContext, UserContext } from './utils/context';

function App() {
  const [activeRoomId, setActiveRoomId] = useState<number | undefined>(undefined);
  return (<UserContext.Provider value='cyrus'>
    <ChatContext.Provider value={{ roomId: activeRoomId, setRoomId: setActiveRoomId }}>
      <div className='h-screen flex'>
        <div className='h-full w-72'>
          <SideBar />
        </div>
        <RoomEntry />
      </div>
    </ChatContext.Provider>
  </UserContext.Provider>)
}

export default App
