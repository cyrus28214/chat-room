import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChatRoom } from "./pages/ChatRoom"
import SetName from "./pages/SetName"
import { ThemeContext, UserContext } from "./utils/context";
import { useEffect, useState } from "react";
import { getSystemTheme } from "./utils/theme";

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
  const [username, setUsername] = useState<string>('');
  const [theme, setTheme] = useState<string>(getSystemTheme());
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <UserContext.Provider value={{ name: username, setName: setUsername }}>
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  </UserContext.Provider>
}

export default App
