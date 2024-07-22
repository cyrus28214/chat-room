import './App.css';
import api from './api/api';
import { RoomList } from './components/RoomList';

function App() {
  // const testMessage: Message = {
  //   messageId: 1234,
  //   roomId: 1234,
  //   sender: 'Alice',
  //   content: 'Hello, World!',
  //   time: (new Date()).getTime(),
  // }
  // const testRoom: RoomPreviewInfo = {
  //   roomId: 1234,
  //   roomName: 'Test Room',
  //   lastMessage: testMessage,
  // };
  const { data } = api.useRoomList();
  return (
    < div className='h-screen w-56' >
      {data ? (<RoomList rooms={data.rooms} />) : "Error"}
    </div >
  )
}

export default App
