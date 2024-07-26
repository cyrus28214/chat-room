import SideBar from './components/SideBar';
import { UserContext } from './utils/context';

function App() {
  return (<UserContext.Provider value='cyrus'>
    <div className='h-screen w-72'>
      <SideBar />
    </div>
  </UserContext.Provider>)
}

export default App
