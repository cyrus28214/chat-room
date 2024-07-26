import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ChatRoom } from "./pages/ChatRoom"
import SetName from "./pages/SetName"
import { ThemeContext, UserContext } from "./utils/context";
import { useEffect } from "react";
import { getSystemTheme } from "./utils/theme";
import { useCache } from "./utils/cache";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
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

function Home() {
  const [username] = useCache("username", "");
  if (username) {
    return <Navigate to="/chat-room" />
  } else {
    return <Navigate to="/set-name" />
  }
}

function App() {
  const [username, setUsername] = useCache("username", "");
  const [theme, setTheme] = useCache('theme', getSystemTheme());
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
