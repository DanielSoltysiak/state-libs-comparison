import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import store from "./app/store"
import { Provider } from "react-redux"
import { usersStore } from "./features/users/usersStore"
import { worker } from "./api/server"

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" })

  usersStore.fetchUsers()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  )
}

start()
