import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Navbar } from "./app/Navbar"
import { PostsList } from "./features/posts/PostsList"
import { AddPostForm } from "./features/posts/AddPostForm"
import { NotificationsList } from "./features/notifications/NotificationsList"
import { SinglePostPage } from "./features/posts/SinglePostPage"
import { EditPostForm } from "./features/posts/EditPostForm"
import { UsersList } from "./features/users/UsersList"
import { UserPage } from "./features/users/UserPage"
import { useUsersContext } from "./features/users/UsersConext"

function App() {
  const { fetchUsers } = useUsersContext()
  useEffect(() => {
    fetchUsers()
  }, [])

  6
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          />
          <Route path="/notifications" element={<NotificationsList />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:userId" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
