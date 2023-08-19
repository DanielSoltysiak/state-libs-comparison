import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { worker } from "./api/server"
import { NotificationProvider } from "./features/notifications/NotificationsContext"
import { PostsContextProvider } from "./features/posts/PostsContext"
import { UserProvider } from "./features/users/UsersConext"

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" })

  ReactDOM.render(
    <React.StrictMode>
      <PostsContextProvider>
        <UserProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UserProvider>
      </PostsContextProvider>
    </React.StrictMode>,
    document.getElementById("root"),
  )
}

start()
