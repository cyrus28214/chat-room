import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChatRoom } from "./pages/ChatRoom"
import SetName from "./pages/SetName"
import { UserContext } from "./utils/context";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SetName />
  },
  {
    path: "/chat-room",
    element: <ChatRoom />
  },
  {
    path: "/set-name",
    element: <SetName />
  }
])

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);

  return <UserContext.Provider value={{ name: username, setName: setUsername }}>
    <RouterProvider router={router} />
  </UserContext.Provider>
}

export default App
